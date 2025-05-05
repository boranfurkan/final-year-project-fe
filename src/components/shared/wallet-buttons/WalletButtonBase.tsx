'use client';

import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';
import React, { ReactNode } from 'react';

import { Button } from '@/components/ui/button';

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
  disabled?: boolean;
}

export const WalletButtonBase: React.FC<WalletButtonBaseProps> = ({
  className = '',
  onClick,
  text,
  icon = <Wallet className="h-4 w-4" />,
  variant = 'outline',
  disabled = false,
}) => {
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      <Button
        variant={variant}
        size="sm"
        onClick={onClick}
        disabled={disabled}
        className={`h-8 min-w-[160px] max-md:w-full flex items-center justify-center gap-2 px-4 
          bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 hover:border-[#F3CC3E]/50 
          hover:text-[#F3CC3E] transition-all ${className} ${
          disabled ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {icon}
        <span className="max-w-[90px] truncate">{text}</span>
      </Button>
    </motion.div>
  );
};

export default WalletButtonBase;
