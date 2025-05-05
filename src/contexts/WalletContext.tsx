'use client';

import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { useWallet as useSuiWallet } from '@suiet/wallet-kit';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import { useAccount } from 'wagmi';

import { ChainType } from '@/types/chain';

interface WalletContextType {
  selectedChain: ChainType;
  setSelectedChain: (chain: ChainType) => void;
  isConnected: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const SELECTED_CHAIN_KEY = 'mintmuse-selected-chain';

export const WalletContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { connected: solanaConnected } = useSolanaWallet();
  const { connected: suiConnected } = useSuiWallet();
  const { isConnected: ethereumConnected } = useAccount();

  const [selectedChain, setSelectedChainState] = useState<ChainType>(() => {
    if (typeof window !== 'undefined') {
      const savedChain = localStorage.getItem(SELECTED_CHAIN_KEY);
      return (savedChain as ChainType) || 'ethereum';
    }
    return 'ethereum';
  });

  const isConnected = useMemo(() => {
    switch (selectedChain) {
      case 'ethereum':
        return ethereumConnected;
      case 'solana':
        return solanaConnected;
      case 'sui':
        return suiConnected;
      default:
        return false;
    }
  }, [selectedChain, ethereumConnected, solanaConnected, suiConnected]);

  const setSelectedChain = useCallback(
    (chain: ChainType) => {
      if (!isConnected) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(SELECTED_CHAIN_KEY, chain);
        }

        setSelectedChainState(chain);
      }
    },
    [isConnected]
  );

  const contextValue = useMemo(
    () => ({
      selectedChain,
      setSelectedChain,
      isConnected,
    }),
    [selectedChain, setSelectedChain, isConnected]
  );

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletContextProvider');
  }
  return context;
};

export default WalletContextProvider;
