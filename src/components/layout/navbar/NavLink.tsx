'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  isActive,
  children,
  className,
  onClick,
}) => (
  <Link
    href={href}
    className={cn(
      'relative px-4 py-2 text-sm uppercase font-medium transition-colors',
      isActive ? 'text-[#F3CC3E]' : 'text-white/80 hover:text-white',
      className
    )}
    onClick={onClick}
  >
    {children}

    {/* Animated underline for active links */}
    {isActive && (
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F3CC3E]"
        layoutId="navbar-underline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    )}
  </Link>
);

export default NavLink;
