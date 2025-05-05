'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';

import { Toaster } from '@/components/ui/sonner';

import WalletProviders from './WalletProviders';


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
        {children}
        <Toaster />
      </WalletProviders>
    </QueryClientProvider>
  );
};

export default Providers;
