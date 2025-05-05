'use client';

import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import React from 'react';

import UnifiedWalletButton from '@/components/shared/wallet-buttons/UnifiedWalletButton';
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
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-[#F3CC3E] hover:bg-black/30"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="bg-gradient-to-b from-[#0D1117]/95 to-[#0D1117]/95 backdrop-blur-lg border-l border-white/10"
        >
          <SheetHeader>
            <SheetTitle className="text-[#F3CC3E]">MintMuse</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col py-6 px-4 gap-6">
            <div className="flex flex-col w-full gap-2">
              {/* Animated navigation links */}
              <motion.div
                className="space-y-4"
                initial="closed"
                animate="open"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.15, delayChildren: 0.25 },
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 },
                  },
                }}
              >
                {[
                  { href: '/', label: 'Home' },
                  { href: '/create', label: 'Create' },
                  { href: '/gallery', label: 'Gallery' },
                ].map((item) => (
                  <motion.div
                    key={item.href}
                    variants={{
                      open: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          type: 'spring',
                          stiffness: 300,
                          damping: 24,
                        },
                      },
                      closed: { opacity: 0, y: 20 },
                    }}
                  >
                    <NavLink
                      href={item.href}
                      isActive={activePath === item.href}
                      className="w-full px-2 py-3 flex items-center text-base"
                      onClick={closeSheet}
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              className="border-t border-white/10 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {isWalletConnected ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <UnifiedWalletButton fullWidth />
                  </div>
                </div>
              ) : (
                <UnifiedWalletButton fullWidth />
              )}
            </motion.div>

            <ProfileMenu isMobile onItemClick={closeSheet} />

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F3CC3E]/30 to-transparent"></div>
              <div className="absolute bottom-16 right-8 w-16 h-16 rounded-full bg-[#2C75FF]/10 blur-xl"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-[#F3CC3E]/10 blur-lg"></div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
