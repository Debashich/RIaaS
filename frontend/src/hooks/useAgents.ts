import { useState, useEffect } from 'react';
import type { Agent } from '../types';
import { getBots } from '../lib/api';

const DEFAULT_AGENTS: Agent[] = [
  {
    id: 'frontend',
    name: 'frontend',
    prompt: '',
    description: 'React, Tailwind, CSS, accessibility, responsive UI',
    accent: '#1164A3'
  },
  {
    id: 'backend',
    name: 'backend',
    prompt: '',
    description: 'Go, Node.js, APIs, databases, system design',
    accent: '#E01E5A'
  },
  {
    id: 'reviewer',
    name: 'reviewer',
    prompt: '',
    description: 'Code review, security, best practices, refactoring',
    accent: '#2EB67D'
  }
];

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>(DEFAULT_AGENTS);
  const [loading, setLoading] = useState(false);

  const fetchCustomBots = async () => {
    try {
      setLoading(true);
      const bots = await getBots();
      const customAgents: Agent[] = bots.map(b => ({
        id: b.name.toLowerCase().replace(/\s+/g, '-'),
        name: b.name,
        prompt: b.prompt,
        description: 'Custom AI Bot',
        accent: '#9C3353' 
      }));
      
      setAgents([...DEFAULT_AGENTS, ...customAgents]);
    } catch (err) {
      console.error('Failed to load custom bots', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomBots();
  }, []);

  return { agents, refreshAgents: fetchCustomBots, loading };
}
