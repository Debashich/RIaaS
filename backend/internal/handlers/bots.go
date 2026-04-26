package handlers

import (
	"agenthub/internal/agents"
	"agenthub/internal/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateCustomBot(c *gin.Context) {
	var bot models.Bot
	if err := c.ShouldBindJSON(&bot); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	if bot.Name == "" || bot.Prompt == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Name and prompt are required"})
		return
	}

	agents.RegisterCustomBot(bot)
	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Bot '" + bot.Name + "' created",
	})
}

func GetBots(c *gin.Context) {
	bots := agents.GetAllCustomBots()
	c.JSON(http.StatusOK, gin.H{"bots": bots})
}
