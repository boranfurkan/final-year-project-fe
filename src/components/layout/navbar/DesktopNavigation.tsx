'use client';

import React from 'react';
import NavLink from './NavLink';
import ProfileMenu from './ProfileMenu';
import UnifiedWalletButton from '@/components/shared/wallet-buttons/UnifiedWalletButton';

interface DesktopNavigationProps {
  activePath: string;
  isWalletConnected: boolean;
  onWalletConnect: () => void;
  onWalletDisconnect: () => void;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  activePath,
}) => {
  return (
    <>
      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center space-x-4">
        <NavLink href="/" isActive={activePath === '/'}>
          Home
        </NavLink>
        <NavLink href="/create" isActive={activePath === '/create'}>
          Create
        </NavLink>
      </nav>

      {/* User Actions (Desktop) */}
      <div className="flex-1 w-full flex items-center justify-end">
        <div className="hidden md:flex items-center space-x-4 w-max">
          <UnifiedWalletButton fullWidth />
          <ProfileMenu />
        </div>
      </div>
    </>
  );
};

export default DesktopNavigation;
