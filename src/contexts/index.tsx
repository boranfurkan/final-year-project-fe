import React from 'react';

import { AuthProvider } from './AuthContext';
import WalletContextProvider from './WalletContext';

const Contexts = ({ children }: { children: React.ReactNode }) => {
  return (
    <WalletContextProvider>
      <AuthProvider>{children}</AuthProvider>
    </WalletContextProvider>
  );
};

export default Contexts;
