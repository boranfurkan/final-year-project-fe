'use client';

import { createNetworkConfig, SuiClientProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletProvider as SuiWalletProvider } from '@suiet/wallet-kit';

import '@rainbow-me/rainbowkit/styles.css';
import '@solana/wallet-adapter-react-ui/styles.css';
import '@suiet/wallet-kit/style.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode, useMemo } from 'react';
import { WagmiProvider } from 'wagmi';
import { createConfig, http } from 'wagmi';
import { mainnet, base, baseSepolia, holesky } from 'wagmi/chains';

import { IS_TESTNET, SUPPORTED_CHAINS } from '@/configs/chain';

// Create configs outside of component to avoid recreation on render
const createWagmiConfig = () =>
  createConfig({
    chains: IS_TESTNET ? [holesky] : [mainnet], // Only use holesky in testnet mode, removed baseSepolia
    transports: {
      [mainnet.id]: http(),
      [holesky.id]: http(),
    },
  });

interface WalletProvidersProps {
  children: ReactNode;
}

const WalletProviders = ({ children }: WalletProvidersProps) => {
  const queryClient = useMemo(() => new QueryClient(), []);
  const wagmiConfig = useMemo(() => createWagmiConfig(), []);

  const networkConfig = useMemo(
    () =>
      createNetworkConfig({
        localnet: { url: getFullnodeUrl('localnet') },
        testnet: { url: getFullnodeUrl('testnet') },
        mainnet: { url: getFullnodeUrl('mainnet') },
      }).networkConfig,
    []
  );

  const solanaEndpoint = useMemo(
    () =>
      clusterApiUrl(SUPPORTED_CHAINS.solana.network as WalletAdapterNetwork),
    []
  );

  const suiNetwork = IS_TESTNET ? 'testnet' : 'mainnet';

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <RainbowKitProvider
          theme={darkTheme({ borderRadius: 'small' })}
          modalSize="compact"
        >
          <ConnectionProvider endpoint={solanaEndpoint}>
            <SolanaWalletProvider wallets={[]} autoConnect>
              <WalletModalProvider>
                <SuiClientProvider
                  networks={networkConfig}
                  network={suiNetwork}
                >
                  <SuiWalletProvider>{children}</SuiWalletProvider>
                </SuiClientProvider>
              </WalletModalProvider>
            </SolanaWalletProvider>
          </ConnectionProvider>
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
};

export default WalletProviders;
