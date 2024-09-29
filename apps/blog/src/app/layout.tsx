import ClientLayout from '@/app/layout.client';
import type { Metadata, Viewport } from 'next';
import { Inter as FontSans } from 'next/font/google';
import React, { type ReactNode } from 'react';
import './global.css';
import { generateHomeMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';

export const metadata: Metadata = generateHomeMetadata();

export const viewport: Viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1,
};

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ko" className={'scroll-smooth light'}>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
