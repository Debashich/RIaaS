import React from 'react';
import type { Bot } from '../types';
import './Sidebar.css';

interface SidebarProps {
  agents: Bot[];
  activeAgent: Bot;
  setActiveAgent: (agent: Bot) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ agents, activeAgent, setActiveAgent }) => {
  const channels = ['general', 'random'];
  const directMessages = agents.filter(agent => !['frontend', 'backend', 'reviewer'].includes(agent.name));
  const builtInAgents = agents.filter(agent => ['frontend', 'backend', 'reviewer'].includes(agent.name));

  return (
    <div className="sidebar">
      <div className="workspace-header">
        <h2>AgentHub</h2>
      </div>
      <div className="channels">
        <h3>Channels</h3>
        <ul>
          {channels.map(channel => (
            <li key={channel} className={channel === 'general' ? 'active' : ''}>
              # {channel}
            </li>
          ))}
        </ul>
      </div>
      <div className="direct-messages">
        <h3>Agents</h3>
        <ul>
          {builtInAgents.map((agent) => (
            <li
              key={agent.name}
              className={activeAgent.name === agent.name ? 'active' : ''}
              onClick={() => setActiveAgent(agent)}
            >
              <span className={`status online`}></span>
              {agent.name}
            </li>
          ))}
        </ul>
      </div>
      {directMessages.length > 0 && (
        <div className="direct-messages">
          <h3>Custom Bots</h3>
          <ul>
            {directMessages.map((agent) => (
              <li
                key={agent.name}
                className={activeAgent.name === agent.name ? 'active' : ''}
                onClick={() => setActiveAgent(agent)}
              >
                <span className={`status online`}></span>
                {agent.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
