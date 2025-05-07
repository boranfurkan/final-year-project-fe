'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useEffect, useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { useMultiChainAuth } from '@/hooks/useMultiChainAuth';

import { WalletButtonBase } from './WalletButtonBase';

const WalletButtonContent: React.FC<{
  connected: boolean;
  isSigningMessage: boolean;
  isAuthed: boolean;
  userDeclinedSigning: boolean;
  handleSignIn: () => void;
  resetDeclinedState: () => void;
  openConnectModal: () => void;
  openChainModal: () => void;
  openAccountModal: () => void;
  chain?: { unsupported?: boolean };
  account?: { displayName: string };
  className?: string;
}> = ({
  connected,
  isSigningMessage,
  isAuthed,
  userDeclinedSigning,
  handleSignIn,
  resetDeclinedState,
  openConnectModal,
  openChainModal,
  openAccountModal,
  chain,
  account,
  className,
}) => {
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

  const handleManualConnect = () => {
    resetDeclinedState();
    openConnectModal();
  };

  if (!connected) {
    return (
      <WalletButtonBase
        onClick={handleManualConnect}
        text={isSigningMessage ? 'Connecting...' : 'Connect Wallet'}
        className={className}
        disabled={isSigningMessage}
      />
    );
  }

  if (chain?.unsupported) {
    return (
      <WalletButtonBase
        onClick={openChainModal}
        text="Wrong Network"
        variant="destructive"
        className={className}
      />
    );
  }

  return (
    <WalletButtonBase
      onClick={openAccountModal}
      text={account?.displayName || ''}
      className={className}
    />
  );
};

interface EthereumWalletButtonProps {
  className?: string;
}

export const EthereumWalletButton: React.FC<EthereumWalletButtonProps> = ({
  className,
}) => {
  const { isAuthed, logout } = useAuth();
  const {
    isSigningMessage,
    userDeclinedSigning,
    handleSignIn,
    resetDeclinedState,
  } = useMultiChainAuth('ethereum');

  // Track connection state at the component level
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

  // This effect runs at the component level to detect disconnection
  useEffect(() => {
    // Only run the logout logic if we were connected before and now we're not
    if (isReady && !isConnected && isAuthed) {
      logout();
    }
  }, [isReady, isConnected, isAuthed, logout]);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        setIsReady(ready);
        setIsConnected(connected ? true : false);

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
            className={className}
          >
            <WalletButtonContent
              connected={connected ? isConnected : false}
              isSigningMessage={isSigningMessage}
              isAuthed={isAuthed}
              userDeclinedSigning={userDeclinedSigning}
              handleSignIn={handleSignIn}
              resetDeclinedState={resetDeclinedState}
              openConnectModal={openConnectModal}
              openChainModal={openChainModal}
              openAccountModal={openAccountModal}
              chain={chain}
              account={account}
              className={className}
            />
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default EthereumWalletButton;
