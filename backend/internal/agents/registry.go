package agents

import (
	"agenthub/internal/models"
	"sync"
)

var (
	DefaultAgents = map[string]models.Agent{
		"frontend": {
			Name: "frontend",
			Prompt: `You are an expert frontend engineer. You specialize in React, TypeScript,
Tailwind CSS, responsive design, accessibility, and UI debugging. Give
concrete, actionable code solutions. Be precise and opinionated.`,
		},
		"backend": {
			Name: "backend",
			Prompt: `You are an expert backend engineer. You specialize in Go, Node.js, REST
APIs, SQL/NoSQL databases, system design, and performance optimization.
Provide clean, idiomatic, production-ready code with explanations.`,
		},
		"reviewer": {
			Name: "reviewer",
			Prompt: `You are a senior code reviewer. You focus on correctness, security
vulnerabilities, performance issues, maintainability, and best practices.
Structure feedback with: Issues Found, Suggestions, and Verdict.`,
		},
	}

	customBots = make(map[string]models.Bot)
	mu         sync.RWMutex
)

func RegisterCustomBot(bot models.Bot) {
	mu.Lock()
	defer mu.Unlock()
	customBots[bot.Name] = bot
}

func GetBotPrompt(name string) (string, bool) {
	// Check default agents first
	if agent, ok := DefaultAgents[name]; ok {
		return agent.Prompt, true
	}

	// Check custom bots
	mu.RLock()
	defer mu.RUnlock()
	bot, ok := customBots[name]
	if ok {
		return bot.Prompt, true
	}

	return "", false
}

func GetAllCustomBots() []models.Bot {
	mu.RLock()
	defer mu.RUnlock()
	bots := make([]models.Bot, 0, len(customBots))
	for _, bot := range customBots {
		bots = append(bots, bot)
	}
	return bots
}
