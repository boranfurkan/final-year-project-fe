'use client';

import React, { useCallback, useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { WalletButtonBase } from './WalletButtonBase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { shortenWalletAddress } from '@/lib/utils';

interface SolanaWalletButtonProps {
  className?: string;
}

export const SolanaWalletButton: React.FC<SolanaWalletButtonProps> = ({
  className,
}) => {
  const { publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const connected = !!publicKey;

  const handleConnect = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const displayAddress = useMemo(() => {
    if (!publicKey) return '';
    return shortenWalletAddress(publicKey.toString());
  }, [publicKey]);

  if (!connected) {
    return (
      <WalletButtonBase
        onClick={handleConnect}
        text="Connect Wallet"
        className={className}
      />
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <WalletButtonBase
            onClick={() => {}}
            text={displayAddress}
            className={className}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={disconnect}>Disconnect</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SolanaWalletButton;
