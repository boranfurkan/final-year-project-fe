'use client';

import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import NavLink from './NavLink';
import ProfileMenu from './ProfileMenu';
import UnifiedWalletButton from '@/components/shared/wallet-buttons/UnifiedWalletButton';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activePath: string;
  isWalletConnected: boolean;
  onWalletConnect: () => void;
  onWalletDisconnect: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  setIsOpen,
  activePath,
  isWalletConnected,
}) => {
  const closeSheet = () => setIsOpen(false);

  return (
    <div className="flex md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>MintMuse</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col py-6 px-4 gap-6">
            <div className="flex flex-col w-full gap-2">
              <NavLink
                href="/"
                isActive={activePath === '/'}
                className="w-full px-0"
                onClick={closeSheet}
              >
                Home
              </NavLink>
              <NavLink
                href="/create"
                isActive={activePath === '/create'}
                className="w-full px-0"
                onClick={closeSheet}
              >
                Create
              </NavLink>
            </div>
            <div className="border-t pt-6">
              {isWalletConnected ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <UnifiedWalletButton fullWidth />
                  </div>
                </div>
              ) : (
                <UnifiedWalletButton fullWidth />
              )}
            </div>
            <ProfileMenu isMobile onItemClick={closeSheet} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
