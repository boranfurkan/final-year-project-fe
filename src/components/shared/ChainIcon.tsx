'use client';

import React from 'react';
import { Coins } from 'lucide-react';
import { ChainType } from '@/types/chain';
import EtethereumIcon from '@/assets/EthereumIcon';
import SolanaIcon from '@/assets/SolanaIcon';
import SuiIcon from '@/assets/SuiIcon';

interface ChainIconProps {
  chainType: ChainType;
  className?: string;
  size?: number;
}

export const ChainIcon: React.FC<ChainIconProps> = ({
  chainType,
  className,
  size = 24,
}) => {
  switch (chainType) {
    case 'ethereum':
      return (
        <EtethereumIcon
          className={className}
          style={{ width: size, height: size }}
        />
      );
    case 'solana':
      return (
        <SolanaIcon
          className={className}
          style={{ width: size, height: size }}
        />
      );
    case 'sui':
      return (
        <SuiIcon className={className} style={{ width: size, height: size }} />
      );
    default:
      return <Coins className={className} size={size} />;
  }
};

export default ChainIcon;
