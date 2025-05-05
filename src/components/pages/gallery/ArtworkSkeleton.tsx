'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ArtworkSkeletonProps {
  index: number;
}

const ArtworkSkeleton: React.FC<ArtworkSkeletonProps> = ({ index }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="h-full"
    >
      <div className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-xl h-full flex flex-col">
        {/* Image placeholder */}
        <div className="aspect-square relative overflow-hidden bg-gray-800 animate-pulse">
          {/* Chain Badge placeholder */}
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm w-16 h-6 rounded-md"></div>
        </div>

        <div className="p-4 flex-grow flex flex-col">
          {/* Creator info placeholder */}
          <div className="mb-2 w-2/3 h-5 bg-gray-700 rounded-md animate-pulse"></div>

          {/* Action buttons placeholder */}
          <div className="mt-auto pt-3 flex gap-2">
            <div className="flex-1 h-8 bg-gray-700 rounded-md animate-pulse"></div>
            <div className="flex-1 h-8 bg-gray-700 rounded-md animate-pulse"></div>
            <div className="flex-1 h-8 bg-gray-700 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtworkSkeleton;
