import { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { InputBar } from './components/InputBar';
import { useAgents } from './hooks/useAgents';
import { useChat } from './hooks/useChat';
import { Menu } from 'lucide-react';

function App() {
  const { agents, refreshAgents } = useAgents();
  const [activeAgentId, setActiveAgentId] = useState<string>('frontend');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeAgent = useMemo(
    () => agents.find((a) => a.id === activeAgentId) || agents[0],
    [agents, activeAgentId]
  );

  const { messages, isTyping, sendMessage } = useChat(activeAgent.id);

  const handleSelectAgent = (id: string) => {
    setActiveAgentId(id);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full flex-shrink-0">
        <Sidebar
          agents={agents}
          activeAgentId={activeAgent.id}
          onSelectAgent={handleSelectAgent}
          onRefreshAgents={refreshAgents}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-[260px] h-full shadow-xl z-10">
            <Sidebar
              agents={agents}
              activeAgentId={activeAgent.id}
              onSelectAgent={handleSelectAgent}
              onRefreshAgents={refreshAgents}
            />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 h-full bg-white">
        {/* Channel header */}
        <div className="flex items-center h-[49px] px-4 border-b border-[#e1e1e1] bg-white flex-shrink-0">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-1 mr-3 text-[#616061] hover:text-[#1d1c1d]"
          >
            <Menu size={20} />
          </button>
          <span className="text-[15px] text-[#616061] font-bold mr-1">#</span>
          <span className="text-[15px] text-[#1d1c1d] font-extrabold">{activeAgent.name}</span>
        </div>

        {/* Chat area */}
        <ChatArea
          messages={messages.filter(
            (m) => m.role === 'user' || m.agentId === activeAgent.id
          )}
          agent={activeAgent}
          isTyping={isTyping}
        />

        {/* Input bar */}
        <div className="flex-shrink-0 bg-white">
          <InputBar onSend={sendMessage} disabled={isTyping} />
        </div>
      </div>
    </div>
  );
}

export default App;
