'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChainIcon } from './ChainIcon';
import { ChainType } from '@/types/chain';
import { useWallet } from '@/contexts/WalletContext';
import { SUPPORTED_CHAINS } from '@/configs/chain';

interface ChainSelectorProps {
  className?: string;
}

export const ChainSelector: React.FC<ChainSelectorProps> = ({ className }) => {
  const { selectedChain, setSelectedChain } = useWallet();

  const handleSelectChain = (chain: ChainType) => {
    setSelectedChain(chain);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`h-8 min-w-[160px] w-[160px] max-md:w-full flex items-center justify-between ${className}`}
        >
          <div className="flex items-center truncate mr-1">
            <ChainIcon
              chainType={selectedChain}
              size={20}
              className="mr-2 flex-shrink-0"
            />
            <span className="capitalize truncate">{selectedChain}</span>
            {SUPPORTED_CHAINS[selectedChain].isTestnet && (
              <span className="ml-1 text-xs text-muted-foreground flex-shrink-0">
                (Test)
              </span>
            )}
          </div>
          <ChevronDown className="h-4 w-4 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {Object.entries(SUPPORTED_CHAINS).map(([key, chain]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => handleSelectChain(key as ChainType)}
            className="flex items-center cursor-pointer"
          >
            <ChainIcon
              chainType={key as ChainType}
              size={16}
              className="mr-2 flex-shrink-0"
            />
            <span className="capitalize">{key}</span>
            {chain.isTestnet && (
              <span className="ml-1 text-xs text-muted-foreground">(Test)</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChainSelector;
