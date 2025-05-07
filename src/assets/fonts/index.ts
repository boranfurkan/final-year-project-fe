import localFont from 'next/font/local';

export const akkuratMonoFont = localFont({
  src: [
    {
      path: './akkurat-mono-regular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-akkurat-mono-ll',
  display: 'swap',
});

export const neueMontrealFont = localFont({
  src: [
    {
      path: './pp-neue-monteral-medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: './pp-neue-monteral-bold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-neue-montreal',
  display: 'swap',
});

export const flabbyBumsFont = localFont({
  src: [
    {
      path: './FlabbyBumshandwriting.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-flabby-bums',
  display: 'swap',
});
