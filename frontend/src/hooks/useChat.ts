import { useState } from 'react';
import type { Message } from '../types';
import { sendMessage as apiSendMessage } from '../lib/api';

export function useChat(activeAgentId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (content: string, image: string | null) => {
    if (!content.trim() && !image) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      image,
      createdAt: Date.now()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const responseContent = await apiSendMessage(activeAgentId, content, image);
      
      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: responseContent,
        agentId: activeAgentId,
        createdAt: Date.now()
      };
      
      setMessages(prev => [...prev, agentMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: "I'm sorry, I encountered an error. Please try again.",
        agentId: activeAgentId,
        createdAt: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearMessages = () => setMessages([]);

  return { messages, isTyping, sendMessage, clearMessages };
}
