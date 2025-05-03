'use client';

import React from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ProfileMenuProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  isMobile = false,
  onItemClick,
}) => {
  const menuItems = [
    {
      href: '/profile',
      label: 'My Profile',
      icon: <User className="h-4 w-4 mr-2" />,
    },
    { href: '/settings', label: 'Settings', icon: null },
    { href: '/my-collection', label: 'My Collection', icon: null },
  ];

  if (isMobile) {
    return (
      <div className="border-t border-white/20 pt-6">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Link
              href={item.href}
              className="flex items-center py-3 text-white/80 hover:text-[#F3CC3E] transition-colors"
              onClick={onItemClick}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-black/30 hover:bg-black/50 hover:text-[#F3CC3E] text-white/90 border border-white/20"
        >
          <User className="h-5 w-5" />
          <span className="sr-only">Profile</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-black/80 backdrop-blur-md border border-white/20 text-white/90"
      >
        {menuItems.map((item) => (
          <DropdownMenuItem
            key={item.href}
            asChild
            className="hover:bg-white/10 hover:text-[#F3CC3E] focus:bg-white/10 focus:text-[#F3CC3E]"
          >
            <Link href={item.href} className="flex items-center">
              {item.icon}
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
