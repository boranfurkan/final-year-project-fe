'use client';

import React from 'react';
import { motion } from 'framer-motion';
import NavLink from './NavLink';
import ProfileMenu from './ProfileMenu';
import UnifiedWalletButton from '@/components/shared/wallet-buttons/UnifiedWalletButton';
import { COLORS } from '@/data/general';

interface DesktopNavigationProps {
  activePath: string;
  isWalletConnected: boolean;
  onWalletConnect: () => void;
  onWalletDisconnect: () => void;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  activePath,
}) => {
  // Animation variants for staggered animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.nav
        className="hidden md:flex items-center space-x-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <NavLink href="/" isActive={activePath === '/'}>
            Home
          </NavLink>
        </motion.div>
        <motion.div variants={item}>
          <NavLink href="/create" isActive={activePath === '/create'}>
            Create
          </NavLink>
        </motion.div>
        <motion.div variants={item}>
          <NavLink href="/gallery" isActive={activePath === '/gallery'}>
            Gallery
          </NavLink>
        </motion.div>
      </motion.nav>

      <motion.div
        className="flex-1 w-full flex items-center justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="hidden md:flex items-center space-x-4 w-max">
          <UnifiedWalletButton fullWidth />
          <ProfileMenu />
        </div>
      </motion.div>
    </>
  );
};

export default DesktopNavigation;
