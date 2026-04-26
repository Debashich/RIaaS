import { useRef, useEffect } from 'react';
import type { Message, Agent } from '../types';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

interface ChatAreaProps {
  messages: Message[];
  agent: Agent;
  isTyping: boolean;
}

export function ChatArea({ messages, agent, isTyping }: ChatAreaProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
      {messages.length === 0 ? (
        <div className="flex flex-col justify-end h-full px-5 pb-4">
          <div
            className="w-[72px] h-[72px] rounded-lg mb-4 flex items-center justify-center text-white text-[36px] font-bold select-none"
            style={{ backgroundColor: agent.accent || '#1164a3' }}
          >
            {agent.name.charAt(0).toUpperCase()}
          </div>

          <h2 className="text-[22px] font-black text-[#1d1c1d] mb-1 leading-tight">
            <span className="opacity-50 font-bold">#</span> {agent.name}
          </h2>

          <p className="text-[15px] text-[#616061] leading-snug mb-1">
            This channel is for working with <strong>@{agent.name}</strong> — {agent.description || 'your AI teammate'}.
          </p>

          <div className="h-px bg-[#e1e1e1] my-4" />
        </div>
      ) : (
        <div className="flex flex-col w-full">
          {/* Welcome header pinned at top of conversation */}
          <div className="px-5 pt-6 pb-2">
            <div
              className="w-[52px] h-[52px] rounded-lg mb-3 flex items-center justify-center text-white text-[26px] font-bold select-none"
              style={{ backgroundColor: agent.accent || '#1164a3' }}
            >
              {agent.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-[18px] font-black text-[#1d1c1d] mb-1">
              <span className="opacity-50 font-bold">#</span> {agent.name}
            </h2>
            <p className="text-[13px] text-[#616061] leading-snug">
              This is the very beginning of the <strong>#{agent.name}</strong> channel.
            </p>
            <div className="h-px bg-[#e1e1e1] mt-4" />
          </div>

          {/* Messages */}
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              agent={msg.role === 'agent' ? agent : undefined}
            />
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 px-5 py-1">
              <div
                className="w-9 h-9 rounded flex items-center justify-center text-white font-bold text-sm select-none flex-shrink-0"
                style={{ backgroundColor: agent.accent || '#1164a3' }}
              >
                {agent.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex items-center gap-2 text-[13px] text-[#616061]">
                <span className="font-bold text-[#1d1c1d]">{agent.name}</span>
                <span>is typing</span>
                <TypingIndicator />
              </div>
            </div>
          )}

          <div ref={bottomRef} className="h-2 w-full flex-shrink-0" />
        </div>
      )}
    </div>
  );
}
