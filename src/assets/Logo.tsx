'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src="/images/logo-transparent.svg"
        alt="MintMuse Logo"
        width={40}
        height={40}
      />
      <span className="hidden font-bold sm:inline-block">MintMuse</span>
    </Link>
  );
};

export default Logo;
