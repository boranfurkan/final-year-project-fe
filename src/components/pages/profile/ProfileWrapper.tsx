'use client';

import { motion } from 'framer-motion';
import { Palette, User, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { useUserControllerGetImages } from '@/api';
import ProfileImageCard from '@/components/pages/profile/ProfileImageCard';
import UnifiedWalletButton from '@/components/shared/wallet-buttons/UnifiedWalletButton';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const ProfileWrapper: React.FC = () => {
  const { user, isAuthed } = useAuth();

  const {
    data: userImages,
    isLoading,
    error,
  } = useUserControllerGetImages({
    query: {
      enabled: isAuthed,
      refetchOnWindowFocus: false,
    },
  });

  return (
    <div className="relative min-h-screen pt-20 pb-8 text-white">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/section-bg/profile-page-bg.jpg"
          alt="Profile Background"
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
            <User className="h-8 w-8 text-[#F3CC3E]" />
            <span>My Profile</span>
          </h1>

          {user ? (
            <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-lg text-white/90">
                Connected as{' '}
                <span className="text-[#F3CC3E] font-medium">
                  {user.walletAddress}
                </span>
              </p>
              <p className="text-sm text-white/70 mt-1">Chain: {user.chain}</p>
            </div>
          ) : (
            <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-lg text-white/90 mb-4">
                Connect your wallet to view your profile
              </p>
              <UnifiedWalletButton />
            </div>
          )}
        </motion.div>

        {/* User's Images */}
        {isAuthed && (
          <div className="w-full max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-between mb-6"
            >
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <ImageIcon className="h-6 w-6 text-[#F3CC3E]" />
                <span>My Creations</span>
                <span className="text-white/60 text-lg ml-2">
                  ({userImages?.count || 0})
                </span>
              </h2>

              <Button
                size="sm"
                className="bg-gradient-to-r from-[#2C75FF] to-[#F3CC3E] hover:opacity-90 text-white"
                onClick={() => (window.location.href = '/create')}
              >
                Create New
              </Button>
            </motion.div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl h-64 animate-pulse"
                  />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12 bg-black/40 backdrop-blur-sm rounded-xl border border-red-500/30">
                <p className="text-red-400">Error loading your images</p>
              </div>
            ) : userImages?.images && userImages.images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userImages.images.map((image, index) => (
                  <ProfileImageCard
                    key={`${image.url}-${index}`}
                    image={image}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-black/40 backdrop-blur-sm rounded-xl border border-white/20">
                <Palette className="h-12 w-12 text-white/30 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white/80 mb-2">
                  No Creations Yet
                </h3>
                <p className="text-white/60 max-w-md mx-auto mb-6">
                  You haven&apos;t created any artwork yet. Start creating
                  beautiful post-impressionist art with our AI.
                </p>
                <Button
                  className="bg-gradient-to-r from-[#2C75FF] to-[#F3CC3E] hover:opacity-90 text-white"
                  onClick={() => (window.location.href = '/create')}
                >
                  Create Your First Artwork
                </Button>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProfileWrapper;
