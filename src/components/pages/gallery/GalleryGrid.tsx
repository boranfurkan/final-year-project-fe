'use client';

import { motion } from 'framer-motion';
import { RefreshCw, MessageSquare } from 'lucide-react';
import React, { useState, useEffect } from 'react';

import { ImageResponse, useImageControllerGetRandomImages } from '@/api';
import { Button } from '@/components/ui/button';

import ArtworkCard from './ArtworkCard';
import ArtworkSkeleton from './ArtworkSkeleton';

interface GalleryGridProps {
  searchWalletAddress?: string;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ searchWalletAddress }) => {
  const {
    data: allArtworks,
    isLoading,
    error,
    refetch,
  } = useImageControllerGetRandomImages({
    query: {
      refetchOnWindowFocus: false,
    },
  });

  const [filteredArtworks, setFilteredArtworks] = useState<ImageResponse[]>([]);
  const [isRefetching, setIsRefetching] = useState(false);

  // Filter artworks when search changes or data updates
  useEffect(() => {
    if (allArtworks) {
      if (searchWalletAddress && searchWalletAddress.trim() !== '') {
        // Filter by wallet address
        const lowercaseSearch = searchWalletAddress.toLowerCase();
        const filtered = allArtworks.filter((artwork) =>
          artwork.createdBy.toLowerCase().includes(lowercaseSearch)
        );
        setFilteredArtworks(filtered);
      } else {
        // No filter active
        setFilteredArtworks(allArtworks);
      }
    }
  }, [allArtworks, searchWalletAddress]);

  const handleRefresh = async () => {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  };

  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 backdrop-blur-sm rounded-xl border border-red-500/30 p-6 max-w-md w-full text-center"
        >
          <MessageSquare className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            Unable to Load Artworks
          </h3>
          <p className="text-white/80 mb-4">
            We encountered an error while fetching the gallery images. Please
            try again later.
          </p>
          <Button
            onClick={() => refetch()}
            className="bg-gradient-to-r from-red-600 to-amber-600 hover:opacity-90 text-white"
          >
            Try Again
            <RefreshCw className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    );
  }

  const placeholderCount = 10;
  const skeletonArray = Array.from(
    { length: placeholderCount },
    (_, index) => index
  );

  const noSearchResults =
    searchWalletAddress &&
    searchWalletAddress.trim() !== '' &&
    filteredArtworks.length === 0 &&
    !isLoading;

  return (
    <div className="w-full">
      {/* Refresh Button */}
      <div className="flex justify-end mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isLoading || isRefetching}
          className="bg-black/30 border-white/20 text-white hover:bg-white/10 hover:text-[#F3CC3E]"
        >
          {isLoading || isRefetching ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="mr-2"
            >
              <RefreshCw size={16} />
            </motion.div>
          ) : (
            <RefreshCw size={16} className="mr-2" />
          )}
          Refresh Gallery
        </Button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          skeletonArray.map((index) => (
            <ArtworkSkeleton key={`skeleton-${index}`} index={index} />
          ))
        ) : noSearchResults ? (
          <div className="col-span-full text-center py-12">
            <p className="text-white/70 text-lg">
              No artworks found for wallet address "{searchWalletAddress}".
            </p>
          </div>
        ) : filteredArtworks.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-white/70 text-lg">
              No artworks found. Try creating some!
            </p>
          </div>
        ) : (
          filteredArtworks.map((artwork, index) => (
            <ArtworkCard
              key={`artwork-${artwork.imageURL}-${index}`}
              artwork={artwork}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GalleryGrid;
