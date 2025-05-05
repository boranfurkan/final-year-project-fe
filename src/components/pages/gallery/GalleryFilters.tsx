'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface GalleryFiltersProps {
  onSearch?: (walletAddress: string) => void;
}

const GalleryFilters: React.FC<GalleryFiltersProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full mb-8"
    >
      <div className="flex items-center">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
          <input
            type="text"
            placeholder="Search by wallet address..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-[#F3CC3E]/50"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryFilters;
