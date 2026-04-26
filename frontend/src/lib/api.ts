import axios from 'axios';
import type { ChatRequest, ChatResponse, Bot, BotsResponse } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatWithAgent = async (req: ChatRequest): Promise<ChatResponse> => {
  const response = await api.post<ChatResponse>('/chat', req);
  return response.data;
};

export const createCustomBot = async (bot: Bot): Promise<{ success: boolean; message: string }> => {
  const response = await api.post('/custom-bot', bot);
  return response.data;
};

export const getCustomBots = async (): Promise<Bot[]> => {
  const response = await api.get<BotsResponse>('/bots');
  return response.data.bots || [];
};
