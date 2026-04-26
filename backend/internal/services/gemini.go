package services

import (
	"agenthub/internal/models"
	"context"
	"encoding/base64"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

type GeminiService struct {
	client *genai.Client
}

func NewGeminiService(ctx context.Context) (*GeminiService, error) {
	apiKey := os.Getenv("GEMINI_API_KEY")
	if apiKey == "" {
		return nil, fmt.Errorf("GEMINI_API_KEY is not set")
	}

	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		return nil, err
	}

	return &GeminiService{client: client}, nil
}

func (s *GeminiService) Chat(ctx context.Context, agentPrompt string, req models.ChatRequest) (string, error) {
	model := s.client.GenerativeModel("gemini-2.5-pro")
	model.SystemInstruction = &genai.Content{
		Parts: []genai.Part{genai.Text(agentPrompt)},
	}

	var parts []genai.Part
	if req.Image != nil && *req.Image != "" {
		// Handle base64 image
		data := *req.Image
		if idx := strings.Index(data, ","); idx != -1 {
			data = data[idx+1:]
		}
		
		imgData, err := base64.StdEncoding.DecodeString(data)
		if err != nil {
			return "", fmt.Errorf("invalid image data: %v", err)
		}

		// Detect mime type
		mimeType := http.DetectContentType(imgData)
		
		parts = append(parts, genai.ImageData(mimeType, imgData))
	}

	parts = append(parts, genai.Text(req.Message))

	// Create context with timeout for the Gemini call
	geminiCtx, cancel := context.WithTimeout(ctx, 30*time.Second)
	defer cancel()

	resp, err := model.GenerateContent(geminiCtx, parts...)
	if err != nil {
		return "", err
	}

	if len(resp.Candidates) == 0 || resp.Candidates[0].Content == nil {
		return "", fmt.Errorf("no response from Gemini")
	}

	var responseText strings.Builder
	for _, part := range resp.Candidates[0].Content.Parts {
		if text, ok := part.(genai.Text); ok {
			responseText.WriteString(string(text))
		}
	}

	return responseText.String(), nil
}
