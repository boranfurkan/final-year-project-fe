import type { Metadata } from 'next';
import { akkuratMonoFont, flabbyBumsFont, neueMontrealFont } from '@/configs';

import Navbar from '@/components/layout/navbar';
import Contexts from '@/contexts';
import Providers from '@/providers';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'MintMuse',
  description:
    'MintMuse is an innovative platform that bridges the gap between AI-generated art and blockchain technology. MintMuse empowers users to transform their creative ideas into unique digital assets with just a few clicks.',
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
        <Contexts>
          <Providers>
            <div className="w-full h-full">
              <Navbar />
              {children}
            </div>
          </Providers>
        </Contexts>
      </body>
    </html>
  );
}
