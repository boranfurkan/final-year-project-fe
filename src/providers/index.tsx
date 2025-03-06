import React from 'react';
import WalletProviders from './WalletProviders';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <WalletProviders>{children}</WalletProviders>;
};

export default Providers;
