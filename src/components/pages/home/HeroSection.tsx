'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  const [prompt, setPrompt] = useState(
    'enchanted forest with magical creatures'
  );
  const promptExamples = [
    'enchanted forest with magical creatures',
    'futuristic city with flying cars',
    'cosmic jellyfish in deep space',
    'cyberpunk samurai with neon sword',
    'underwater temple with ancient guardians',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * promptExamples.length);
      setPrompt(promptExamples[randomIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 z-0" />

      {/* Animated particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, Math.random() * 1.5 + 1, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 20 + 10,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-full">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500"
          >
            Turn Imagination Into NFTs
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            Create unique NFT artwork with AI and mint on Ethereum, Solana, or
            Sui blockchain in seconds.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              Start Creating
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              How It Works
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="relative mx-auto rounded-xl overflow-hidden shadow-2xl border border-white/10 w-full max-w-2xl aspect-video"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-blue-900/30" />
            <div className="absolute inset-x-0 top-0 bg-black/80 p-3 text-left border-b border-white/10">
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-green-400 font-mono"
              >
                &gt; Generating NFT with prompt: &quot;
                <span className="text-blue-400">{prompt}</span>&quot;
              </motion.p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{
                  rotate: 360,
                  opacity: [0.8, 0.2, 0.8],
                }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                  opacity: { duration: 3, repeat: Infinity },
                }}
                className="w-20 h-20 border-4 border-t-purple-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-3 flex justify-between items-center bg-black/80 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-white/70">
                  Generating preview...
                </span>
              </div>
              <span className="text-xs text-white/70">67%</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black to-transparent z-10" />
    </div>
  );
};

export default HeroSection;
