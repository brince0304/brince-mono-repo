'use client';

import Header from '@/components/common/Header/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import React, { type ReactNode } from 'react';

const menuItems = [{ name: 'Home', path: '/' }];

const queryClient = new QueryClient();

export default function ClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider attribute="class">
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Header menuItems={menuItems} />
          <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-16">
            {children}
          </main>
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
