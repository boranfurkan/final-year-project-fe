'use client';

import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

import Logo from '@/assets/icons/Logo';
import { useAuth } from '@/contexts/AuthContext';

import DesktopNavigation from './DesktopNavigation';
import MobileMenu from './MobileMenu';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const { logout } = useAuth();

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
  };

  const handleDisconnectWallet = () => {
    logout();
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
