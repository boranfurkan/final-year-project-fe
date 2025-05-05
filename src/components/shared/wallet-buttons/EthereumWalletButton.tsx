'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { useMultiChainAuth } from '@/hooks/useMultiChainAuth';

import { WalletButtonBase } from './WalletButtonBase';

// Create a separate component for the button content
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
  // Now we can use useEffect at the top level of this component
  React.useEffect(() => {
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

  const handleManualConnect = () => {
    resetDeclinedState(); // Reset declined state when user manually connects
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
  const { isAuthed } = useAuth();
  const {
    isSigningMessage,
    userDeclinedSigning,
    handleSignIn,
    resetDeclinedState,
  } = useMultiChainAuth('ethereum');

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
              connected={connected ? connected : false}
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
