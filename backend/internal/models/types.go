package models

type ChatRequest struct {
	Agent   string  `json:"agent"`
	Message string  `json:"message"`
	Image   *string `json:"image"` // base64 string or null
}

type ChatResponse struct {
	Response string `json:"response"`
	Error    string `json:"error,omitempty"`
}

type Bot struct {
	Name   string `json:"name"`
	Prompt string `json:"prompt"`
}

type Agent struct {
	Name   string `json:"name"`
	Prompt string `json:"prompt"`
}
