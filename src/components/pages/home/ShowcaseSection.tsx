'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Example NFT data - replace with your actual examples
const nftExamples = [
  {
    id: 1,
    title: 'Cosmic Dreamer',
    prompt: 'A dreamy cosmic being floating through space with nebula colors',
    chain: 'ethereum',
    creator: '0x742...8def',
    image: '/nft1.png',
  },
  {
    id: 2,
    title: 'Digital Samurai',
    prompt: 'Cyberpunk samurai with neon sword in futuristic Tokyo',
    chain: 'solana',
    creator: 'SNK9...j2PV',
    image: '/nft2.png',
  },
  {
    id: 3,
    title: 'Underwater Kingdom',
    prompt:
      'Ancient underwater temple with merfolk guardians and bioluminescent plants',
    chain: 'sui',
    creator: '0x881...5ce1',
    image: '/nft3.png',
  },
  {
    id: 4,
    title: 'Desert Oracle',
    prompt:
      'Mystical oracle in sand dunes with glowing symbols and shifting sands',
    chain: 'ethereum',
    creator: '0x938...4f21',
    image: '/nft4.png',
  },
  {
    id: 5,
    title: 'Mechanical Heart',
    prompt: 'Steampunk mechanical heart with gears and copper pipes',
    chain: 'solana',
    creator: 'AK72...9fZ1',
    image: '/nft5.png',
  },
  {
    id: 6,
    title: 'Crystal Forest',
    prompt: 'Enchanted forest with crystal trees and magical butterflies',
    chain: 'sui',
    creator: '0x422...9a7b',
    image: '/nft6.png',
  },
];

const chainIcons = {
  ethereum: '/eth-icon.svg',
  solana: '/solana-icon.svg',
  sui: '/sui-icon.svg',
};

const ShowcaseSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === nftExamples.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? nftExamples.length - 3 : prevIndex - 1
    );
  };

  return (
    <div className="py-24 bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
              Featured Creations
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Check out these amazing NFTs created by our users
          </p>
        </motion.div>

        <div className="relative">
          <motion.button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10"
            onClick={prevSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10"
            onClick={nextSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          <div className="overflow-hidden px-6">
            <motion.div
              className="flex gap-6"
              animate={{ x: `-${currentIndex * 33.33}%` }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            >
              {nftExamples.map((nft) => (
                <motion.div
                  key={nft.id}
                  className="min-w-[calc(33.33%-1rem)] sm:min-w-[calc(33.33%-1.5rem)]"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-white/10 shadow-xl">
                    <div className="aspect-square relative overflow-hidden bg-black">
                      {/* This is a placeholder for your NFT images */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 z-10" />
                      <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                        <span className="font-bold text-white">
                          NFT {nft.id}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md text-xs flex items-center gap-1 z-20 border border-white/10">
                        <div className="w-3 h-3 rounded-full bg-white" />
                        <span>{nft.chain}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-1">{nft.title}</h3>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {nft.prompt}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>By: {nft.creator}</span>
                        <span className="bg-white/10 px-2 py-1 rounded">
                          #{nft.id}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: nftExamples.length - 2 }).map((_, index) => (
              <motion.button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? 'bg-white' : 'bg-white/30'
                }`}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseSection;
