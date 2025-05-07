'use client';

import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { useWallet as useSuiWallet } from '@suiet/wallet-kit';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAccount } from 'wagmi';

import { UserResponse, useUserControllerGetMe } from '@/api';
import { useWallet as useWalletContext } from '@/contexts/WalletContext';
import { getCookie, setCookie, deleteCookie } from '@/lib/browser';
import { ChainType } from '@/types/chain';
import { useRouter } from 'next/navigation';

const REFETCH_INTERVAL_ME = 60000;
const AUTH_TOKEN_KEY = 'jwt';
const LAST_CONNECTED_CHAIN_KEY = 'last-connected-chain';

type AuthContextType = {
  user: UserResponse | undefined;
  isUserLoading: boolean;
  isAuthed: boolean;
  login: (authToken: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { selectedChain, setSelectedChain } = useWalletContext();
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const { connected: solanaConnected } = useSolanaWallet();
  const { connected: suiConnected } = useSuiWallet();
  const { isConnected: ethereumConnected } = useAccount();

  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useUserControllerGetMe({
    query: {
      enabled: isAuthed,
      refetchInterval: REFETCH_INTERVAL_ME,
    },
  });

  useEffect(() => {
    if (userError) {
      console.error('Error fetching user data:', userError);

      const status = (userError as any)?.response?.status;
      if (status === 401) {
        logout();
        toast.error('Session expired, please reconnect your wallet');
      }
    }
  }, [userError]);

  useEffect(() => {
    const token = getCookie(AUTH_TOKEN_KEY);
    const lastConnectedChain = localStorage.getItem(LAST_CONNECTED_CHAIN_KEY);

    if (token) {
      setIsAuthed(true);

      if (lastConnectedChain && lastConnectedChain !== selectedChain) {
        try {
          setSelectedChain(lastConnectedChain as ChainType);
        } catch (error) {
          console.error('Error restoring last connected chain:', error);
        }
      }
    }

    setInitialized(true);
  }, []);

  const isWalletConnected = (() => {
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
  })();

  useEffect(() => {
    if (!initialized) return;

    const isDisconnected = !isWalletConnected;

    if (isAuthed && isDisconnected) {
      const timer = setTimeout(() => {
        logout();
        toast.info('Disconnected from wallet');
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [initialized, isAuthed, isWalletConnected, selectedChain]);

  const login = (authToken: string) => {
    setCookie(AUTH_TOKEN_KEY, authToken, 1);
    setIsAuthed(true);

    localStorage.setItem(LAST_CONNECTED_CHAIN_KEY, selectedChain);
  };

  const logout = () => {
    deleteCookie(AUTH_TOKEN_KEY);
    setIsAuthed(false);
    router.push('/');
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
