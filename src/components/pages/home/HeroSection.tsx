'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SAMPLE_PROMPTS } from '@/data/general';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPromptIndex((prev) => (prev + 1) % SAMPLE_PROMPTS.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative h-full text-white py-20 md:py-10">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/section-bg/hero-section-bg.jpg"
          alt="Van Gogh Starry Night"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen h-full">
        {/* Gradient transitions */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-black" />

        <div className="container mx-auto px-4 py-12 flex-grow flex flex-col lg:flex-row">
          {/* Left Content Side */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center p-4 lg:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-2"
            >
              <span className="inline-block px-4 py-1 bg-black/40 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                AI-Powered Art Generation
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Create NFTs in
              <span className="block text-[#F3CC3E]">Vincent van Gogh's</span>
              iconic style
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-white/90 mb-8 max-w-lg backdrop-blur-sm bg-black/30 p-3 rounded-lg"
            >
              Our AI transforms your ideas into stunning artwork with Van Gogh's
              distinctive brushwork and color palette. Mint directly on
              Ethereum, Solana, or Sui blockchain.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Link href="/create">
                <Button
                  size="lg"
                  className={`bg-gradient-to-r from-[#2C75FF] to-[#F3CC3E] hover:opacity-90 text-white w-full sm:w-auto`}
                >
                  Start Creating <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-white/40 bg-black/30 backdrop-blur-sm hover:bg-white/10 w-full sm:w-auto"
              >
                View Gallery <Palette className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="border-l-2 border-[#F3CC3E] pl-4 bg-black/30 backdrop-blur-sm p-3 rounded-r-lg"
            >
              <p className="text-sm text-white/80 mb-2">
                Try with these prompts:
              </p>
              <AnimatePresence mode="wait">
                {!isTransitioning && (
                  <motion.p
                    key={currentPromptIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.5 }}
                    className="font-medium text-white"
                  >
                    "{SAMPLE_PROMPTS[currentPromptIndex].prompt}"
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right Image Side - Now clearly visible on mobile */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12 mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative max-w-md w-full aspect-square"
            >
              {/* Decorative frame */}
              <div className="absolute -inset-3 border-4 border-[#F3CC3E]/50 rounded-lg z-0" />

              {/* Image display */}
              <AnimatePresence mode="wait">
                {!isTransitioning && (
                  <motion.div
                    key={currentPromptIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full relative rounded-lg overflow-hidden shadow-2xl"
                  >
                    {/* Image from SAMPLE_PROMPTS */}
                    <Image
                      src={SAMPLE_PROMPTS[currentPromptIndex].image}
                      alt={`AI generated art: ${SAMPLE_PROMPTS[
                        currentPromptIndex
                      ].prompt.substring(0, 50)}...`}
                      fill
                      className="object-cover"
                    />

                    {/* Overlay with prompt */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4 text-sm">
                      <p className="text-white/90 italic line-clamp-2">
                        "{SAMPLE_PROMPTS[currentPromptIndex].prompt}"
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress dots */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                {SAMPLE_PROMPTS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      idx === currentPromptIndex
                        ? 'bg-[#F3CC3E]'
                        : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
