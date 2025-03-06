'use client';

import React from 'react';
import Link from 'next/link';
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
      'px-4 py-2 text-sm uppercase font-medium transition-colors hover:text-primary',
      isActive ? 'text-primary' : 'text-muted-foreground',
      className
    )}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default NavLink;
