package main

import (
	"agenthub/internal/handlers"
	"agenthub/internal/services"
	"context"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	ctx := context.Background()
	geminiService, err := services.NewGeminiService(ctx)
	if err != nil {
		log.Fatalf("Failed to initialize Gemini service: %v", err)
	}

	chatHandler := handlers.NewChatHandler(geminiService)

	r := gin.Default()

	// CORS Config
	r.Use(func(c *gin.Context) {
		origin := c.Request.Header.Get("Origin")
		// Allow specific origins
		if origin == "http://localhost:5173" || origin == "http://localhost:3000" {
			c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
		}
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	})

	api := r.Group("/api")
	{
		api.POST("/chat", chatHandler.HandleChat)
		api.POST("/custom-bot", handlers.CreateCustomBot)
		api.GET("/bots", handlers.GetBots)
	}

	log.Printf("Server starting on :8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
