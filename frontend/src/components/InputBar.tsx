import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, X, Bold, Italic, Link, List, AtSign } from 'lucide-react';
import { cn } from '../lib/utils';

interface InputBarProps {
  onSend: (message: string, image: string | null) => void;
  disabled?: boolean;
}

export function InputBar({ onSend, disabled }: InputBarProps) {
  const [input, setInput] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSend = () => {
    if ((!input.trim() && !image) || disabled) return;
    onSend(input, image);
    setInput('');
    setImage(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImage(ev.target?.result as string);
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const hasContent = input.trim() || image;

  return (
    <div className="px-5 pb-4 pt-0">
      {/* Image preview */}
      {image && (
        <div className="mb-2 inline-flex items-center bg-[#f8f8f8] border border-[#e1e1e1] rounded overflow-hidden">
          <img src={image} alt="Preview" className="h-16 w-16 object-cover" />
          <button
            onClick={() => setImage(null)}
            className="p-1.5 text-[#616061] hover:text-[#1d1c1d] hover:bg-[#e8e8e8]"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Compose box */}
      <div
        className={cn(
          'flex flex-col rounded-lg border bg-white overflow-hidden',
          disabled
            ? 'border-[#ccc] opacity-60'
            : 'border-[#868686] focus-within:border-[#1d1c1d] focus-within:shadow-[0_0_0_1px_#1d1c1d]'
        )}
      >
        {/* Toolbar */}
        <div className="flex items-center gap-0.5 px-1 py-1 border-b border-[#e8e8e8]">
          <button className="p-1.5 rounded hover:bg-[#f0f0f0] text-[#616061]">
            <Bold size={15} />
          </button>
          <button className="p-1.5 rounded hover:bg-[#f0f0f0] text-[#616061]">
            <Italic size={15} />
          </button>
          <div className="w-px h-4 bg-[#ddd] mx-0.5" />
          <button className="p-1.5 rounded hover:bg-[#f0f0f0] text-[#616061]">
            <Link size={15} />
          </button>
          <button className="p-1.5 rounded hover:bg-[#f0f0f0] text-[#616061]">
            <List size={15} />
          </button>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message ..."
          disabled={disabled}
          rows={1}
          className="w-full bg-transparent text-[15px] text-[#1d1c1d] placeholder:text-[#8d8d8e] px-3 py-2 resize-none outline-none custom-scrollbar max-h-[200px] min-h-[38px] leading-[1.46666667]"
        />

        {/* Bottom bar */}
        <div className="flex items-center justify-between px-1 py-1">
          <div className="flex items-center gap-0.5">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              className="p-1.5 rounded hover:bg-[#f0f0f0] text-[#616061]"
              title="Attach file"
            >
              <Paperclip size={16} />
            </button>
            <button className="p-1.5 rounded hover:bg-[#f0f0f0] text-[#616061]" title="Mention">
              <AtSign size={16} />
            </button>
          </div>

          <button
            onClick={handleSend}
            disabled={!hasContent || disabled}
            className={cn(
              'p-1.5 rounded',
              hasContent && !disabled
                ? 'bg-[#007a5a] text-white hover:bg-[#148567]'
                : 'bg-transparent text-[#ccc] cursor-default'
            )}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
