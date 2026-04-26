export interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  image?: string | null;
  timestamp: number;
  agent?: string;
}

export interface Agent {
// ...existing code...


export interface Bot {
  name: string;
  prompt: string;
}

export interface ChatRequest {
  agent: string;
  message: string;
  image: string | null;
}

export interface ChatResponse {
  response: string;
  error?: string;
}

export interface BotsResponse {
  bots: Bot[];
}
