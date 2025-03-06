'use client';

import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { WalletButtonBase } from './WalletButtonBase';

interface EthereumWalletButtonProps {
  className?: string;
}

export const EthereumWalletButton: React.FC<EthereumWalletButtonProps> = ({
  className,
}) => {
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
            {(() => {
              if (!connected) {
                return (
                  <WalletButtonBase
                    onClick={openConnectModal}
                    text="Connect Wallet"
                    className={className}
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
