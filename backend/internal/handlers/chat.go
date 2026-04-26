package handlers

import (
	"agenthub/internal/agents"
	"agenthub/internal/models"
	"agenthub/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ChatHandler struct {
	geminiService *services.GeminiService
}

func NewChatHandler(gs *services.GeminiService) *ChatHandler {
	return &ChatHandler{geminiService: gs}
}

func (h *ChatHandler) HandleChat(c *gin.Context) {
	var req models.ChatRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, models.ChatResponse{Error: "Invalid request body"})
		return
	}

	prompt, ok := agents.GetBotPrompt(req.Agent)
	if !ok {
		c.JSON(http.StatusNotFound, models.ChatResponse{Error: "Agent not found"})
		return
	}

	response, err := h.geminiService.Chat(c.Request.Context(), prompt, req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.ChatResponse{Error: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.ChatResponse{Response: response})
}
