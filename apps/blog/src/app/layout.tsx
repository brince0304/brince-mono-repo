import ClientLayout from '@/app/layout.client';
import type { Metadata, Viewport } from 'next';
import React, { type ReactNode } from 'react';
import './global.css';
import { generateHomeMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';
import { pretendard } from '@/lib/font';

export const metadata: Metadata = generateHomeMetadata();

export const viewport: Viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ko" className={`scroll-smooth light ${pretendard.variable}`}>
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
