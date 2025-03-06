import React from 'react';
import WalletContextProvider from './WalletContext';

const Contexts = ({ children }: { children: React.ReactNode }) => {
  return <WalletContextProvider>{children}</WalletContextProvider>;
};

export default Contexts;
