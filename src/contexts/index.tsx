import React from 'react';
import WalletContextProvider from './WalletContext';
import { AuthProvider } from './AuthContext';

const Contexts = ({ children }: { children: React.ReactNode }) => {
  return (
    <WalletContextProvider>
      <AuthProvider>{children}</AuthProvider>
    </WalletContextProvider>
  );
};

export default Contexts;
