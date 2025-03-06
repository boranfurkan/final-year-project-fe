'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import { ChainType } from '@/types/chain';

interface WalletContextType {
  selectedChain: ChainType;
  setSelectedChain: (chain: ChainType) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedChain, setSelectedChainState] =
    useState<ChainType>('ethereum');

  const setSelectedChain = useCallback((chain: ChainType) => {
    setTimeout(() => {
      setSelectedChainState(chain);
    }, 0);
  }, []);

  const contextValue = useMemo(
    () => ({
      selectedChain,
      setSelectedChain,
    }),
    [selectedChain, setSelectedChain]
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
