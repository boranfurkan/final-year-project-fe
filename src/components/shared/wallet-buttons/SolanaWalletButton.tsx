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
import { useAuth } from '@/contexts/AuthContext';

interface SolanaWalletButtonProps {
  className?: string;
}

export const SolanaWalletButton: React.FC<SolanaWalletButtonProps> = ({
  className,
}) => {
  const { publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const { isAuthed } = useAuth();
  const {
    isSigningMessage,
    userDeclinedSigning,
    handleSignIn,
    resetDeclinedState,
  } = useMultiChainAuth('solana');

  const connected = !!publicKey;

  const handleConnect = useCallback(() => {
    // Reset declined state when user manually clicks connect
    resetDeclinedState();
    setVisible(true);
  }, [setVisible, resetDeclinedState]);

  const handleDisconnect = useCallback(() => {
    // Reset declined state when disconnecting
    resetDeclinedState();
    disconnect();
  }, [disconnect, resetDeclinedState]);

  const displayAddress = useMemo(() => {
    if (!publicKey) return '';
    return shortenWalletAddress(publicKey.toString());
  }, [publicKey]);

  useEffect(() => {
    // Only attempt sign-in if:
    // 1. Connected
    // 2. Not already authenticated
    // 3. Not currently in signing process
    // 4. User hasn't explicitly declined signing
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
