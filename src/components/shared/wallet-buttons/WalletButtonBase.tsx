'use client';

import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button
        variant={variant}
        size="sm"
        onClick={onClick}
        className={`h-8 min-w-[160px] max-md:w-full flex items-center justify-center gap-2 px-4 
          bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 hover:border-[#F3CC3E]/50 
          hover:text-[#F3CC3E] transition-all ${className}`}
      >
        {icon}
        <span className="max-w-[90px] truncate">{text}</span>
      </Button>
    </motion.div>
  );
};

export default WalletButtonBase;
