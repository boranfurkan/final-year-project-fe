'use client';

import React from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';
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
  if (isMobile) {
    return (
      <div className="border-t pt-6">
        <Link
          href="/profile"
          className="flex items-center py-2"
          onClick={onItemClick}
        >
          <User className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">My Profile</span>
        </Link>
        <Link
          href="/settings"
          className="flex items-center py-2"
          onClick={onItemClick}
        >
          <span className="text-sm font-medium pl-6 max-md:px-0">Settings</span>
        </Link>
        <Link
          href="/my-collection"
          className="flex items-center py-2"
          onClick={onItemClick}
        >
          <span className="text-sm font-medium pl-6 max-md:px-0">
            My Collection
          </span>
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
          <span className="sr-only">Profile</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/profile">My Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/my-collection">My Collection</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
