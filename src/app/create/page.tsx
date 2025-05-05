'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, Info } from 'lucide-react';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { useWallet } from '@/contexts/WalletContext';
import ChatMessage from '@/components/pages/create/ChatMessage';
import ChatInput from '@/components/pages/create/ChatInput';
import GeneratedImage from '@/components/pages/create/GeneratedImage';
import UnifiedWalletButton from '@/components/shared/wallet-buttons/UnifiedWalletButton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const CreatePage: React.FC = () => {
  const {
    messages,
    isGenerating,
    generatedImage,
    handlePromptSubmission,
    resetGeneratedImage,
    resetConversation,
  } = useImageGeneration();

  const { isConnected } = useWallet();

  return (
    <div className="relative min-h-screen pt-20 pb-8 text-white">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/section-bg/create-page-bg.gif"
          alt="Art Creation Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 relative z-10 flex flex-col items-center"
      >
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center max-w-2xl mx-auto mb-8 flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <Sparkles className="h-8 w-8 text-[#F3CC3E]" />
            <span>Create Your Artwork</span>
          </h1>
          <p className="text-lg text-white/90 bg-black/40 backdrop-blur-sm p-4 rounded-lg">
            Describe what you want to create and our AI will transform it into a
            stunning post-impressionist artwork with vibrant colors and
            expressive brushstrokes.
          </p>
        </motion.div>

        {/* Wallet Connection Reminder (if not connected) */}
        {!isConnected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full max-w-2xl mx-auto mb-6 bg-black/60 backdrop-blur-sm rounded-lg border border-[#F3CC3E]/30 p-4"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1">
                <h3 className="text-[#F3CC3E] font-bold mb-1 flex items-center gap-2">
                  <Info size={16} />
                  Connect Your Wallet
                </h3>
                <p className="text-sm text-white/80">
                  You can create artwork without connecting, but you'll need a
                  wallet to mint your creations as NFTs.
                </p>
              </div>
              <UnifiedWalletButton />
            </div>
          </motion.div>
        )}

        {/* Main Content Area */}
        <div className="w-full max-w-2xl mx-auto">
          {/* Display Generated Image if available */}
          {generatedImage && (
            <GeneratedImage
              image={generatedImage}
              onReset={resetGeneratedImage}
              isWalletConnected={isConnected}
            />
          )}

          {/* Chat Interface */}
          {!generatedImage && (
            <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
              {/* Chat Messages */}
              <div className="h-[50vh] min-h-[400px] max-h-[600px] overflow-y-auto p-4">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
              </div>

              {/* Chat Input */}
              <div className="border-t border-white/10 p-4 bg-black/60">
                <ChatInput
                  onSubmit={handlePromptSubmission}
                  onReset={resetConversation}
                  isLoading={isGenerating}
                />
              </div>
            </div>
          )}
        </div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 w-full max-w-2xl mx-auto"
        >
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <h3 className="text-[#F3CC3E] font-bold mb-2 flex items-center gap-2">
              <Info size={16} />
              <span>Tips for Great Results</span>
            </h3>
            <ul className="text-sm text-white/80 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-[#F3CC3E]">•</span>
                <span>
                  Be descriptive about colors, mood, scenery, and lighting in
                  your prompt
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#F3CC3E]">•</span>
                <span>
                  Try landscape scenes, starry skies, sunflowers, cafés, or
                  countryside views
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#F3CC3E]">•</span>
                <span>
                  Mention "swirling patterns," "bold brushstrokes," or "vibrant
                  colors" for better results
                </span>
              </li>
            </ul>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-xs text-white/50 mt-2">
                  Why are my results in this distinctive style?
                </TooltipTrigger>
                <TooltipContent className="bg-black/90 border border-white/20 text-white p-3 max-w-xs">
                  <p>
                    MintMuse specializes in creating artwork inspired by
                    post-impressionist techniques with bold brushstrokes,
                    vibrant colors, and emotional expression characteristic of
                    Vincent van Gogh's revolutionary artistic style.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CreatePage;
