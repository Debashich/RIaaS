export interface Bot {
  name: string;
  prompt: string;
  description?: string;
  accent?: string;
}

export interface Agent extends Bot {
  id: string; // usually lowercase name
}

export interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  agentId?: string; // which agent replied
  image?: string | null;
  createdAt: number;
}
