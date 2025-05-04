'use client';

import React, { useState, useEffect } from 'react';
import { useWallet } from '@suiet/wallet-kit';
import { WalletButtonBase } from './WalletButtonBase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { shortenWalletAddress } from '@/lib/utils';
import { useMultiChainAuth } from '@/hooks/useMultiChainAuth';
import { useAuth } from '@/providers/AuthProvider';

interface SuiWalletButtonProps {
  className?: string;
}

export const SuiWalletButton: React.FC<SuiWalletButtonProps> = ({
  className,
}) => {
  const {
    connected,
    account,
    select,
    disconnect,
    configuredWallets,
    detectedWallets,
  } = useWallet();

  const { isAuthed } = useAuth();
  const { isSigningMessage, handleSignIn } = useMultiChainAuth('sui');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const availableWallets = [...configuredWallets, ...detectedWallets];

  const displayAddress = account?.address
    ? shortenWalletAddress(account.address)
    : '';

  const handleConnect = () => {
    setIsDialogOpen(true);
  };

  const connectToWallet = (walletName: string) => {
    select(walletName);
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (connected && !isAuthed && !isSigningMessage) {
      handleSignIn();
    }
  }, [connected, isAuthed, isSigningMessage]);

  if (!connected) {
    return (
      <>
        <WalletButtonBase
          onClick={handleConnect}
          text={isSigningMessage ? 'Connecting...' : 'Connect Wallet'}
          className={className}
          disabled={isSigningMessage}
        />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md max-h-[50vh] my-auto">
            <DialogHeader>
              <DialogTitle>Connect Sui Wallet</DialogTitle>
            </DialogHeader>
            <div className="max-h-[30vh] overflow-y-auto pr-1 my-2">
              <div className="grid gap-3 py-2">
                {availableWallets.length > 0 ? (
                  availableWallets.map((wallet) => (
                    <Button
                      key={wallet.name}
                      onClick={() => {
                        if (!wallet.installed) {
                          return;
                        }
                        connectToWallet(wallet.name);
                      }}
                      className="w-full justify-start h-9"
                      variant="outline"
                    >
                      {wallet.name}
                      {!wallet.installed && ' (Install)'}
                    </Button>
                  ))
                ) : (
                  <div className="text-center py-3">
                    <p className="text-muted-foreground">
                      No Sui wallets detected.
                    </p>
                    <a
                      href="https://suiet.app/download"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline mt-2 inline-block"
                    >
                      Install Suiet Wallet
                    </a>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
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

export default SuiWalletButton;
