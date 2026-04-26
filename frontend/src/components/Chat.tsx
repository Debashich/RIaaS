import React, { useEffect, useRef } from 'react';
import type { Message } from '../types';
import './Chat.css';

interface ChatProps {
  messages: Message[];
}

const Chat: React.FC<ChatProps> = ({ messages }) => {
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <h3># general</h3>
      </div>
      <div className="message-list">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.role}`}>
            <div className="message-user">{message.role === 'user' ? 'You' : message.agent || 'AI Bot'}</div>
            <div className="message-content">
              <div className="message-text">{message.content}</div>
              <div className="message-timestamp">{formatTimestamp(message.timestamp)}</div>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
    </div>
  );
};

export default Chat;
