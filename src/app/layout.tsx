import type { Metadata } from 'next';

import {
  akkuratMonoFont,
  flabbyBumsFont,
  neueMontrealFont,
} from '@/assets/fonts';
import Navbar from '@/components/layout/navbar';
import Contexts from '@/contexts';
import Providers from '@/providers';

import '@/styles/globals.css';
import { SITE_DESCRIPTION, SITE_NAME } from '@/data/general';

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  icons: {
    icon: '/favicon.ico',
  },
  keywords: 'MintMuse, NFTs, Image AI, onchain, web3',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased dark ${akkuratMonoFont.className} ${neueMontrealFont.variable} ${flabbyBumsFont.variable}`}
      >
        <Providers>
          <Contexts>
            <div className="w-full h-full">
              <Navbar />
              {children}
            </div>
          </Contexts>
        </Providers>
      </body>
    </html>
  );
}
