'use client';

import React, { useCallback, useEffect, useMemo } from 'react';
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
import { useMultiChainAuth } from '@/hooks/useMultiChainAuth';
import { useAuth } from '@/providers/AuthProvider';

interface SolanaWalletButtonProps {
  className?: string;
}

export const SolanaWalletButton: React.FC<SolanaWalletButtonProps> = ({
  className,
}) => {
  const { publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const { isAuthed } = useAuth();
  const { isSigningMessage, handleSignIn } = useMultiChainAuth('solana');

  const connected = !!publicKey;

  const handleConnect = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const displayAddress = useMemo(() => {
    if (!publicKey) return '';
    return shortenWalletAddress(publicKey.toString());
  }, [publicKey]);

  useEffect(() => {
    if (connected && !isAuthed && !isSigningMessage) {
      handleSignIn();
    }
  }, [connected, isAuthed, isSigningMessage]);

  if (!connected) {
    return (
      <WalletButtonBase
        onClick={handleConnect}
        text={isSigningMessage ? 'Connecting...' : 'Connect Wallet'}
        className={className}
        disabled={isSigningMessage}
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
