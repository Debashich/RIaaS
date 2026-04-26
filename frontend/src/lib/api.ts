import type { Bot } from '../types';

const API_BASE = 'http://localhost:8080/api';

const USE_MOCK = true;
const mockBots: Bot[] = [];

export async function sendMessage(agent: string, message: string, image: string | null): Promise<string> {
  if (USE_MOCK) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return `This is a mock response from **@${agent}**.\n\nYou said: "${message}"${image ? '\n\n*Image received*' : ''}\n\n\`\`\`javascript\nconsole.log("Mock data!");\n\`\`\``;
  }
  
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ agent, message, image })
  });
  if (!res.ok) throw new Error('Failed to send message');
  const data = await res.json();
  return data.response;
}

export async function createCustomBot(name: string, prompt: string): Promise<boolean> {
  if (USE_MOCK) {
    await new Promise(resolve => setTimeout(resolve, 800));
    mockBots.push({ name, prompt });
    return true;
  }

  const res = await fetch(`${API_BASE}/custom-bot`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, prompt })
  });
  if (!res.ok) throw new Error('Failed to create bot');
  const data = await res.json();
  return data.success;
}

export async function getBots(): Promise<Bot[]> {
  if (USE_MOCK) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockBots];
  }

  const res = await fetch(`${API_BASE}/bots`);
  if (!res.ok) throw new Error('Failed to fetch bots');
  const data = await res.json();
  return data.bots;
}
