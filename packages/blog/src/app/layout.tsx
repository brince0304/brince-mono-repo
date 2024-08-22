import type { Metadata, Viewport } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/app/layout.client';
import React, { type ReactNode } from 'react';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-kr',
});

export const metadata: Metadata = {
  title: '브린스 개발블로그',
  description: '브린스 개발블로그',
};

export const viewport: Viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#171717' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} scroll-smooth light`}>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="font-sans overflow-x-hidden antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
