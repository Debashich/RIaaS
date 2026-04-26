import type { Message, Agent } from '../types';
import ReactMarkdown from 'react-markdown';

interface MessageBubbleProps {
  message: Message;
  agent?: Agent;
}

export function MessageBubble({ message, agent }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const timeString = new Date(message.createdAt).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <div className="flex w-full hover:bg-[#f8f8f8] px-5 py-[5px] group">
      {/* Avatar */}
      <div className="flex-shrink-0 w-9 h-9 mr-2 mt-[2px]">
        {isUser ? (
          <div className="w-9 h-9 rounded bg-[#1164a3] flex items-center justify-center text-white font-bold text-sm select-none cursor-pointer">
            U
          </div>
        ) : (
          <div
            className="w-9 h-9 rounded flex items-center justify-center text-white font-bold text-sm select-none cursor-pointer"
            style={{ backgroundColor: agent?.accent || '#1164a3' }}
          >
            {agent?.name ? agent.name.charAt(0).toUpperCase() : 'B'}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-baseline gap-2 mb-[1px]">
          <span className="font-bold text-[15px] text-[#1d1c1d] cursor-pointer hover:underline leading-[1.4]">
            {isUser ? 'You' : agent?.name}
          </span>
          <span className="text-[12px] text-[#616061] cursor-pointer hover:underline leading-[1.4]">
            {timeString}
          </span>
        </div>

        <div className="text-[15px] text-[#1d1c1d] leading-[1.46666667] break-words">
          {message.image && (
            <img
              src={message.image}
              alt="Uploaded"
              className="max-w-[360px] max-h-[250px] rounded object-cover cursor-pointer hover:shadow-md mt-1 mb-1 border border-[#e1e1e1]"
            />
          )}
          {message.content && (
            <div className="slack-prose">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
