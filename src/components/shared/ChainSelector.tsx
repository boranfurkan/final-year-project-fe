'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { SUPPORTED_CHAINS } from '@/configs/chain';
import { useWallet } from '@/contexts/WalletContext';
import { ChainType } from '@/types/chain';

import { ChainIcon } from './ChainIcon';

interface ChainSelectorProps {
  className?: string;
}

export const ChainSelector: React.FC<ChainSelectorProps> = ({ className }) => {
  const { selectedChain, setSelectedChain, isConnected } = useWallet();

  const handleSelectChain = (chain: ChainType) => {
    setSelectedChain(chain);
  };

  const buttonClassName = `h-8 min-w-[160px] w-[160px] max-md:w-full flex items-center justify-between 
    bg-black/30 backdrop-blur-sm border-white/20 text-white 
    ${
      isConnected
        ? 'opacity-90 cursor-not-allowed'
        : 'hover:bg-white/10 hover:border-[#F3CC3E]/50 hover:text-[#F3CC3E]'
    } transition-all ${className}`;

  const buttonContent = (
    <>
      <div className="flex items-center truncate mr-1">
        <ChainIcon
          chainType={selectedChain}
          size={20}
          className="mr-2 flex-shrink-0"
        />
        <span className="capitalize truncate">{selectedChain}</span>
      </div>
      {!isConnected && <ChevronDown className="h-4 w-4 flex-shrink-0" />}
    </>
  );

  if (isConnected) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 1 }}>
              <Button
                variant="outline"
                size="sm"
                className={buttonClassName}
                disabled={true}
              >
                {buttonContent}
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Disconnect your wallet to change chains</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button variant="outline" size="sm" className={buttonClassName}>
            {buttonContent}
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[160px] bg-black/80 backdrop-blur-md border border-white/20 text-white"
      >
        {Object.entries(SUPPORTED_CHAINS).map(([key]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => handleSelectChain(key as ChainType)}
            className="flex items-center cursor-pointer hover:bg-white/10 hover:text-[#F3CC3E] focus:bg-white/10 focus:text-[#F3CC3E]"
          >
            <ChainIcon
              chainType={key as ChainType}
              size={16}
              className="mr-2 flex-shrink-0"
            />
            <span className="capitalize">{key}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChainSelector;
