'use client';

import React from 'react';

import { useWallet } from '@/contexts/WalletContext';
import { ChainType } from '@/types/chain';

import ChainSelector from '../ChainSelector';

import { EthereumWalletButton } from './EthereumWalletButton';
import { SolanaWalletButton } from './SolanaWalletButton';
import { SuiWalletButton } from './SuiWalletButton';

interface WalletButtonProps {
  className?: string;
  fullWidth?: boolean;
}

export const UnifiedWalletButton: React.FC<WalletButtonProps> = ({
  className = '',
  fullWidth = false,
}) => {
  const { selectedChain } = useWallet();

  const walletButtonClass = fullWidth ? 'w-full' : '';

  const renderWalletButton = (chain: ChainType) => {
    switch (chain) {
      case 'ethereum':
        return <EthereumWalletButton className={walletButtonClass} />;
      case 'solana':
        return <SolanaWalletButton className={walletButtonClass} />;
      case 'sui':
        return <SuiWalletButton className={walletButtonClass} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`flex gap-2 items-center max-md:flex-col ${className} ${
        fullWidth ? 'w-full' : ''
      }`}
    >
      <ChainSelector />
      <div
        className={`flex-grow  max-md:w-full ${
          fullWidth ? 'w-full' : 'w-[160px]'
        }`}
      >
        {renderWalletButton(selectedChain)}
      </div>
    </div>
  );
};

export default UnifiedWalletButton;
