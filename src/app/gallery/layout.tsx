import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Art Gallery | MintMuse',
  description:
    'Explore stunning post-impressionist artworks created by our community',
};

export default function GalleryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
