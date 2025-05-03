'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

import DesktopNavigation from './DesktopNavigation';
import MobileMenu from './MobileMenu';
import Logo from '@/assets/Logo';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectWallet = () => {
    // Implement your wallet connection logic here
    setIsWalletConnected(true);
  };

  const handleDisconnectWallet = () => {
    // Implement your wallet disconnection logic here
    setIsWalletConnected(false);
  };

  return (
    <header className="fixed top-0 z-40 w-full border-b border-white/10 bg-transparent backdrop-blur">
      <div className="container flex h-16 items-center justify-between bg-transparent">
        {/* Logo Component */}
        <div className="flex-1 w-full">
          <Logo />
        </div>

        {/* Desktop Navigation Components */}
        <DesktopNavigation
          activePath={pathname}
          isWalletConnected={isWalletConnected}
          onWalletConnect={handleConnectWallet}
          onWalletDisconnect={handleDisconnectWallet}
        />

        {/* Mobile Menu Component */}
        <MobileMenu
          isOpen={isSheetOpen}
          setIsOpen={setIsSheetOpen}
          activePath={pathname}
          isWalletConnected={isWalletConnected}
          onWalletConnect={handleConnectWallet}
          onWalletDisconnect={handleDisconnectWallet}
        />
      </div>
    </header>
  );
};

export default Navbar;
