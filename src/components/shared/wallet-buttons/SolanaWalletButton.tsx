'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import React, { useCallback, useEffect, useMemo } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useMultiChainAuth } from '@/hooks/useMultiChainAuth';
import { shortenWalletAddress } from '@/lib/utils';

import { WalletButtonBase } from './WalletButtonBase';

interface SolanaWalletButtonProps {
  className?: string;
}

export const SolanaWalletButton: React.FC<SolanaWalletButtonProps> = ({
  className,
}) => {
  const { publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const { isAuthed, logout } = useAuth();
  const {
    isSigningMessage,
    userDeclinedSigning,
    handleSignIn,
    resetDeclinedState,
  } = useMultiChainAuth('solana');

  const connected = !!publicKey;

  const handleConnect = useCallback(() => {
    resetDeclinedState();
    setVisible(true);
  }, [setVisible, resetDeclinedState]);

  const handleDisconnect = useCallback(() => {
    resetDeclinedState();
    disconnect();
    logout();
  }, [disconnect, resetDeclinedState]);

  const displayAddress = useMemo(() => {
    if (!publicKey) return '';
    return shortenWalletAddress(publicKey.toString());
  }, [publicKey]);

  useEffect(() => {
    if (connected && !isAuthed && !isSigningMessage && !userDeclinedSigning) {
      handleSignIn();
    }
  }, [
    connected,
    isAuthed,
    isSigningMessage,
    userDeclinedSigning,
    handleSignIn,
  ]);

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
        <DropdownMenuItem onClick={handleDisconnect}>
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SolanaWalletButton;
