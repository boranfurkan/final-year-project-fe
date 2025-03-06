'use client';

import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';

interface WalletButtonBaseProps {
  className?: string;
  onClick: () => void;
  text: string;
  icon?: ReactNode;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
}

export const WalletButtonBase: React.FC<WalletButtonBaseProps> = ({
  className = '',
  onClick,
  text,
  icon = <Wallet className="h-4 w-4" />,
  variant = 'outline',
}) => {
  return (
    <Button
      variant={variant}
      size="sm"
      onClick={onClick}
      className={`h-8 min-w-[160px] max-md:w-full flex items-center justify-center gap-2 px-4 ${className}`}
    >
      {icon}
      <span className="max-w-[90px] truncate">{text}</span>
    </Button>
  );
};

export default WalletButtonBase;
