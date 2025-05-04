'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { UserResponse, useUserControllerGetMe } from '@/api';
import { useWallet as useWalletContext } from '@/contexts/WalletContext';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { useWallet as useSuiWallet } from '@suiet/wallet-kit';
import { getCookie, setCookie, deleteCookie } from '@/lib/browser';
import { useAccount } from 'wagmi';

const REFETCH_INTERVAL_ME = 60000;

type AuthContextType = {
  user: UserResponse | undefined;
  isUserLoading: boolean;
  isAuthed: boolean;
  login: (authToken: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { selectedChain } = useWalletContext();
  const [isAuthed, setIsAuthed] = useState(false);

  const { connected: solanaConnected, disconnecting: solanaDisconnecting } =
    useSolanaWallet();
  const { connected: suiConnected } = useSuiWallet();
  const { isConnected: ethereumConnected } = useAccount();

  const { data: user, isLoading: isUserLoading } = useUserControllerGetMe({
    query: {
      enabled: isAuthed,
      refetchInterval: REFETCH_INTERVAL_ME,
    },
  });

  useEffect(() => {
    const token = getCookie('jwt');
    if (token) {
      setIsAuthed(true);
    }
  }, []);

  useEffect(() => {
    const isDisconnected = (() => {
      switch (selectedChain) {
        case 'ethereum':
          return !ethereumConnected;
        case 'solana':
          return solanaDisconnecting || !solanaConnected;
        case 'sui':
          return !suiConnected;
        default:
          return false;
      }
    })();

    if (isAuthed && isDisconnected) {
      logout();
    }
  }, [
    isAuthed,
    selectedChain,
    ethereumConnected,
    solanaConnected,
    solanaDisconnecting,
    suiConnected,
  ]);

  const login = (authToken: string) => {
    setCookie('jwt', authToken, 1);
    setIsAuthed(true);
  };

  const logout = () => {
    deleteCookie('jwt');
    if (isAuthed) {
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    }
    setIsAuthed(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isUserLoading, isAuthed, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
