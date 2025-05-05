import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { Message } from '@/hooks/useImageGeneration';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  // Animation variants
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.3 }}
      className={cn(
        'flex w-full mb-4 max-w-[90%]',
        isUser ? 'ml-auto justify-end' : 'mr-auto justify-start'
      )}
    >
      <div
        className={cn(
          'flex items-start gap-3 rounded-lg p-4',
          isUser
            ? 'bg-[#F3CC3E]/10 border border-[#F3CC3E]/20'
            : isSystem
            ? 'bg-black/40 backdrop-blur-sm border border-white/10'
            : 'bg-[#2C75FF]/10 border border-[#2C75FF]/20'
        )}
      >
        {!isUser && (
          <div
            className={cn(
              'flex-shrink-0 rounded-full p-2 w-10 h-10 flex items-center justify-center',
              isSystem ? 'bg-black/50' : 'bg-[#2C75FF]/20'
            )}
          >
            <Bot size={20} className="text-white" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex gap-2 items-center mb-1">
            <span
              className={cn(
                'text-sm font-medium',
                isUser
                  ? 'text-[#F3CC3E]'
                  : isSystem
                  ? 'text-white'
                  : 'text-[#2C75FF]'
              )}
            >
              {isUser ? 'You' : isSystem ? 'MintMuse' : 'AI Assistant'}
            </span>
            <span className="text-xs text-white/50">
              {message.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <div className="text-white/90 whitespace-pre-wrap break-words">
            {message.isLoading ? (
              <div className="flex items-center gap-2">
                <span>{message.content}</span>
                <motion.div
                  className="flex gap-1 ml-2"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    repeatType: 'reverse',
                  }}
                >
                  <span className="w-2 h-2 bg-white/50 rounded-full" />
                  <span className="w-2 h-2 bg-white/50 rounded-full" />
                  <span className="w-2 h-2 bg-white/50 rounded-full" />
                </motion.div>
              </div>
            ) : (
              message.content
            )}
          </div>
        </div>

        {isUser && (
          <div className="flex-shrink-0 rounded-full p-2 w-10 h-10 flex items-center justify-center bg-[#F3CC3E]/20">
            <User size={20} className="text-[#F3CC3E]" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
