import { useState } from 'react';
import type { Agent } from '../types';
import { cn } from '../lib/utils';
import { Plus } from 'lucide-react';
import { CustomBotModal } from './CustomBotModal';

interface SidebarProps {
  agents: Agent[];
  activeAgentId: string;
  onSelectAgent: (id: string) => void;
  onRefreshAgents: () => void;
}

export function Sidebar({ agents, activeAgentId, onSelectAgent, onRefreshAgents }: SidebarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-[260px] flex-shrink-0 flex flex-col bg-slack-sidebar text-slack-sidebarText h-full border-r border-[#5d2c5d]">
      <div className="px-4 py-3 pb-4 hover:bg-slack-sidebarHover cursor-pointer flex items-center justify-between border-b border-[#5d2c5d] transition-colors">
        <h1 className="font-extrabold tracking-tight text-[18px] text-white">AgentHub</h1>
      </div>

      <div className="flex-1 overflow-y-auto pt-4 custom-scrollbar">
        <div className="px-4 mb-2 flex items-center justify-between group">
          <span className="text-[13px] font-bold">Channels</span>
        </div>
        
        <div className="flex flex-col gap-[2px]">
          {agents.map((agent) => {
            const isActive = activeAgentId === agent.id;
            return (
              <button
                key={agent.id}
                onClick={() => onSelectAgent(agent.id)}
                className={cn(
                  "flex items-center gap-2 w-full px-4 py-[5px] text-[15px] text-left transition-none",
                  isActive 
                    ? "bg-slack-sidebarActiveBg text-slack-sidebarActiveText font-medium" 
                    : "text-slack-sidebarText hover:bg-slack-sidebarHover"
                )}
              >
                <span className={cn("opacity-70 text-[17px] mr-1 font-light leading-none", isActive && "opacity-100")}>#</span>
                <span className="truncate">{agent.name}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 px-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-1 py-1 text-[15px] text-slack-sidebarText hover:bg-slack-sidebarHover w-full rounded transition-none"
          >
            <div className="w-5 h-5 rounded bg-[#4a154b] flex items-center justify-center border border-[#5d2c5d] opacity-80 decoration-inherit">
              <Plus size={14} className="opacity-100 text-slack-sidebarText" />
            </div>
            Add channel
          </button>
        </div>
      </div>

      <CustomBotModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={onRefreshAgents}
      />
    </div>
  );
}
