import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import MessageInput from './components/MessageInput';
import type { Message, Bot } from './types';
import { chatWithAgent, getCustomBots } from './lib/api';
import './App.css';

const BUILT_IN_AGENTS: Bot[] = [
  { name: 'frontend', prompt: 'Frontend Agent' },
  { name: 'backend', prompt: 'Backend Agent' },
  { name: 'reviewer', prompt: 'Reviewer Agent' },
];

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [agents, setAgents] = useState<Bot[]>(BUILT_IN_AGENTS);
  const [activeAgent, setActiveAgent] = useState<Bot>(BUILT_IN_AGENTS[0]);

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const customBots = await getCustomBots();
        setAgents([...BUILT_IN_AGENTS, ...customBots]);
      } catch (error) {
        console.error('Error fetching custom bots:', error);
      }
    };
    fetchBots();
  }, []);

  const handleSendMessage = async (text: string) => {
    let targetAgent = activeAgent.name;
    let messageContent = text;

    const mentionRegex = /@(\w+)/;
    const match = text.match(mentionRegex);

    if (match) {
      const agentName = match[1];
      const foundAgent = agents.find(a => a.name.toLowerCase() === agentName.toLowerCase());
      if (foundAgent) {
        targetAgent = foundAgent.name;
        messageContent = text.replace(mentionRegex, '').trim();
      }
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await chatWithAgent({ agent: targetAgent, message: messageContent, image: null });
      const agentMessage: Message = {
        id: Date.now().toString(),
        role: 'agent',
        content: response.response,
        timestamp: Date.now(),
        agent: targetAgent,
      };
      setMessages((prev) => [...prev, agentMessage]);
    } catch (error) {
      console.error('Error communicating with the agent:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'agent',
        content: 'Sorry, I am having trouble connecting to the bot.',
        timestamp: Date.now(),
        agent: targetAgent,
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="app">
      <Sidebar agents={agents} activeAgent={activeAgent} setActiveAgent={setActiveAgent} />
      <div className="main-content">
        <Chat messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;

