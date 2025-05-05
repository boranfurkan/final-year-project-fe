'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageResponse } from '@/api';
import { toast } from 'sonner';
import { shortenWalletAddress } from '@/lib/utils';

interface ArtworkCardProps {
  artwork: ImageResponse;
  index: number;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, index }) => {
  const { imageURL, createdBy, prompt } = artwork;
  const [isHovering, setIsHovering] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(imageURL);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mintmuse-artwork-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Image downloaded successfully');
    } catch (error) {
      toast.error('Failed to download image');
    }
  };

  const handleShare = () => {
    window.open(imageURL, '_blank');
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 },
    },
  };

  const overlayVariants = {
    hidden: {
      opacity: 0,
      backdropFilter: 'blur(0px)',
    },
    visible: {
      opacity: 1,
      backdropFilter: 'blur(3px)',
      transition: {
        duration: 0.3,
        when: 'beforeChildren',
      },
    },
    exit: {
      opacity: 0,
      backdropFilter: 'blur(0px)',
      transition: {
        duration: 0.2,
        when: 'afterChildren',
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="h-full"
    >
      <div className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-xl h-full flex flex-col transform transition-transform duration-300">
        <div
          className="aspect-square relative overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Artwork Image */}
          <Image
            src={imageURL}
            alt={`Artwork by ${shortenWalletAddress(createdBy)}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />

          {/* Animated prompt overlay on hover */}
          <AnimatePresence>
            {isHovering && (
              <motion.div
                className="absolute inset-0 bg-black/80 p-4 overflow-y-auto flex flex-col"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div
                  variants={contentVariants}
                  className="flex flex-col h-full"
                >
                  <h4 className="text-[#F3CC3E] font-bold mb-2">
                    Creation Prompt:
                  </h4>
                  <p className="text-white/90 text-sm flex-grow overflow-y-auto no-scrollbar">
                    {prompt}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-4 flex-grow flex flex-col">
          {/* Creator info */}
          <div className="mb-2">
            <p className="text-white/70 text-sm">
              Created by{' '}
              <span className="font-medium text-[#F3CC3E]">
                {shortenWalletAddress(createdBy)}
              </span>
            </p>
          </div>

          {/* Action buttons */}
          <div className="mt-auto pt-3 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="flex-1 bg-black/30 border-white/20 text-white hover:bg-white/10 hover:text-[#F3CC3E]"
              title="Download artwork"
            >
              <Download size={16} className="mr-2" />
              <span>Download</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex-1 bg-black/30 border-white/20 text-white hover:bg-white/10 hover:text-[#F3CC3E]"
              title="View full image"
            >
              <ExternalLink size={16} className="mr-2" />
              <span>View</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtworkCard;
