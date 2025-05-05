import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Artwork | MintMuse',
  description:
    'Create your own post-impressionist artwork with AI and mint it as an NFT',
};

export default function CreateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
