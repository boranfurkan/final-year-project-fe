'use client';

import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import GalleryFilters from '@/components/pages/gallery/GalleryFilters';
import GalleryGrid from '@/components/pages/gallery/GalleryGrid';
import { Button } from '@/components/ui/button';


const GalleryPage: React.FC = () => {
  const [searchWalletAddress, setSearchWalletAddress] = useState('');

  const handleSearch = (walletAddress: string) => {
    setSearchWalletAddress(walletAddress);
  };

  return (
    <div className="relative min-h-screen pt-20 pb-8 text-white">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/section-bg/gallery-page-bg.webp"
          alt="Gallery Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 relative z-10"
      >
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <Palette className="h-8 w-8 text-[#F3CC3E]" />
            <span>Random Artwork Gallery</span>
          </h1>
          <p className="text-lg text-white/90 bg-black/40 backdrop-blur-sm p-4 rounded-lg">
            Explore stunning post-impressionist artworks created by our users.
            Each piece is a unique AI-generated creation inspired by the style
            of Vincent van Gogh.
          </p>
        </motion.div>

        {/* Create Your Own CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-3xl mx-auto mb-8 bg-gradient-to-r from-[#2C75FF]/20 to-[#F3CC3E]/20 backdrop-blur-sm rounded-lg border border-white/10 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <h3 className="text-xl font-bold text-[#F3CC3E] mb-1">
              Create Your Own Masterpiece
            </h3>
            <p className="text-sm text-white/80">
              Generate unique post-impressionist artwork using our AI and mint
              it as an NFT.
            </p>
          </div>
          <Link href="/create">
            <Button className="bg-gradient-to-r from-[#2C75FF] to-[#F3CC3E] hover:opacity-90 text-white">
              Start Creating
            </Button>
          </Link>
        </motion.div>

        <GalleryFilters onSearch={handleSearch} />

        <GalleryGrid searchWalletAddress={searchWalletAddress} />
      </motion.div>
    </div>
  );
};

export default GalleryPage;
