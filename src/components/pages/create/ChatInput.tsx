import React, { useState, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  onSubmit: (prompt: string) => void;
  onReset?: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSubmit,
  onReset,
  isLoading,
  disabled = false,
}) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    if (prompt.trim() && !isLoading && !disabled) {
      onSubmit(prompt);
      setPrompt('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-2"
    >
      <div className="relative flex items-center">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            disabled
              ? 'Please connect your wallet to generate art'
              : 'Describe the art you want to create...'
          }
          disabled={disabled || isLoading}
          className="w-full p-4 pr-24 bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl text-white resize-none min-h-[60px] max-h-[120px] focus:outline-none focus:ring-1 focus:ring-[#F3CC3E]/50"
          rows={2}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
          {onReset && (
            <Button
              variant="ghost"
              size="icon"
              disabled={isLoading || disabled}
              onClick={onReset}
              className="h-10 w-10 rounded-full bg-gray-800/50 hover:bg-gray-800 text-white/70 hover:text-white"
            >
              <RefreshCw size={18} />
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            disabled={!prompt.trim() || isLoading || disabled}
            className={`h-10 w-10 rounded-full transition-all ${
              !prompt.trim() || isLoading || disabled
                ? 'bg-gray-700/50 text-white/50'
                : 'bg-gradient-to-r from-[#F3CC3E] to-[#F3CC3E] text-black hover:opacity-90'
            }`}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              >
                <RefreshCw size={18} />
              </motion.div>
            ) : (
              <Send size={18} />
            )}
          </Button>
        </div>
      </div>

      <p className="text-xs text-white/50 text-center max-w-xs mx-auto">
        Describe what you want to create in the style of a post-impressionist
        painting with vibrant colors and bold brushstrokes.
      </p>
    </motion.div>
  );
};

export default ChatInput;
