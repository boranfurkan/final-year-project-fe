import EthereumIcon from '@/assets/EthereumIcon';
import SolanaIcon from '@/assets/SolanaIcon';
import SuiIcon from '@/assets/SuiIcon';
import React, { JSX } from 'react';

export interface ChainIconProps {
  size?: number;
  color?: string;
  className?: string;
  [key: string]: any;
}

export type ChainTicker = 'ETH' | 'SOL' | 'SUI';

export const getChainIcon = (
  ticker: ChainTicker,
  props: ChainIconProps = {}
): JSX.Element | null => {
  const { size = 24, color, className = '', ...restProps } = props;

  const styles = {
    width: size,
    height: size,
    color: color,
    ...restProps,
  };

  switch (ticker) {
    case 'ETH':
      return <EthereumIcon className={className} {...styles} />;
    case 'SOL':
      return <SolanaIcon className={className} {...styles} />;
    case 'SUI':
      return <SuiIcon className={className} {...styles} />;
    default:
      return null;
  }
};
