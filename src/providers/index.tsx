'use client';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WalletProviders from './WalletProviders';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from './AuthProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 3,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProviders>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </WalletProviders>
    </QueryClientProvider>
  );
};

export default Providers;
