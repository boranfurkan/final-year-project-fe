'use client';

import { motion } from 'framer-motion';
import { User, LogOut } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

interface ProfileMenuProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  isMobile = false,
  onItemClick,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout, isAuthed } = useAuth();

  const handleLogout = () => {
    logout();
    if (onItemClick) {
      onItemClick();
    }
  };

  if (!isAuthed) {
    return null;
  }

  const menuItems = [
    {
      href: '/profile',
      label: 'My Profile',
      icon: <User className="h-4 w-4 mr-2" />,
      onClick: onItemClick,
    },
    {
      href: '#',
      label: 'Logout',
      icon: <LogOut className="h-4 w-4 mr-2" />,
      onClick: handleLogout,
    },
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
            {item.href === '#' ? (
              <button
                className="flex items-center py-3 text-white/80 hover:text-[#F3CC3E] transition-colors w-full text-left"
                onClick={item.onClick}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ) : (
              <Link
                href={item.href}
                className="flex items-center py-3 text-white/80 hover:text-[#F3CC3E] transition-colors"
                onClick={item.onClick}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
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
            key={item.label}
            className="hover:bg-white/10 hover:text-[#F3CC3E] focus:bg-white/10 focus:text-[#F3CC3E]"
          >
            {item.href === '#' ? (
              <button
                className="flex items-center w-full text-left"
                onClick={() => {
                  setDropdownOpen(false);
                  if (item.onClick) {
                    item.onClick();
                  }
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ) : (
              <Link
                href={item.href}
                className="flex items-center"
                onClick={() => {
                  setDropdownOpen(false);
                  if (item.onClick) {
                    item.onClick();
                  }
                }}
              >
                {item.icon}
                {item.label}
              </Link>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
