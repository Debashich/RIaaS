import React, { useState } from 'react';
import { X } from 'lucide-react';
import { createCustomBot } from '../lib/api';


interface CustomBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CustomBotModal({ isOpen, onClose, onSuccess }: CustomBotModalProps) {
  const [name, setName] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !prompt.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      await createCustomBot(name, prompt);
      onSuccess();
      setName('');
      setPrompt('');
      onClose();
    } catch (err) {
      setError('Failed to create custom bot');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
        <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col font-sans">
          <div className="flex justify-between items-center p-5 border-b border-gray-200">
            <h2 className="text-[22px] font-bold text-[#1d1c1d]">Add custom channel</h2>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-500 hover:text-gray-900 rounded hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-5">
            {error && <div className="p-3 rounded bg-red-50 border border-red-200 text-red-600 text-[15px]">{error}</div>}
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[15px] font-bold text-[#1d1c1d]">Name</label>
              <div className="text-[13px] text-gray-500 mb-1">Don't forget the prompt will define how this agent behaves.</div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. data-analyst"
                className="w-full px-3 py-2 text-[15px] border border-gray-400 rounded outline-none focus:border-[#1164a3] focus:shadow-[0_0_0_1px_#1164a3] transition-shadow placeholder:text-gray-400"
                required
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[15px] font-bold text-[#1d1c1d]">System Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe how the bot should behave and what it knows..."
                rows={4}
                className="w-full px-3 py-2 text-[15px] border border-gray-400 rounded outline-none focus:border-[#1164a3] focus:shadow-[0_0_0_1px_#1164a3] transition-shadow resize-none placeholder:text-gray-400 custom-scrollbar"
                required
              />
            </div>
            
            <div className="flex justify-end gap-3 mt-4 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded font-bold text-[#1d1c1d] border border-gray-400 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !name.trim() || !prompt.trim()}
                className="px-4 py-2 rounded font-bold bg-[#007a5a] text-white hover:bg-[#148567] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Adding...' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
