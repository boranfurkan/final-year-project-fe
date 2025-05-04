'use client';

import React, { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { WalletButtonBase } from './WalletButtonBase';
import { useMultiChainAuth } from '@/hooks/useMultiChainAuth';
import { useAuth } from '@/contexts/AuthContext';

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

        useEffect(() => {
          // Only attempt sign-in if:
          // 1. Connected
          // 2. Not already authenticated
          // 3. Not currently in signing process
          // 4. User hasn't explicitly declined signing
          if (
            connected &&
            !isAuthed &&
            !isSigningMessage &&
            !userDeclinedSigning
          ) {
            handleSignIn();
          }
        }, [connected, isAuthed, isSigningMessage, userDeclinedSigning]);

        const handleManualConnect = () => {
          resetDeclinedState(); // Reset declined state when user manually connects
          openConnectModal();
        };

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
            {(() => {
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

              if (chain.unsupported) {
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
                  text={account.displayName}
                  className={className}
                />
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default EthereumWalletButton;
