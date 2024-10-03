'use client';

import CustomError from '@/components/Error/CustomError/CustomError';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import ToastContainerWrapper from '@/components/Toast/ToastContainer/ToastContainerWrapper';
import { Footer } from '@repo/ui/Footer';
import { Header } from '@repo/ui/Header';
import { ErrorBoundary } from '@suspensive/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import React, { type ReactNode } from 'react';

const menuItems = [
  { name: '메인', path: '/' },
  { name: '포스트', path: '/posts' },
];

const queryClient = new QueryClient();

export default function ClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme={'system'}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen flex flex-col transition-colors duration-300">
          <ErrorBoundary
            fallback={
              <CustomError
                code={500}
                message="알수없는 오류가 발생했어요"
                emoji="🙅"
                onClick={() => {
                  window.location.href = '/';
                }}
              />
            }
          >
            <ProgressBar />
            <Header menuItems={menuItems} themeToggle={<ThemeToggle />} />
            <main className="flex-grow max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
              {children}
              <ToastContainerWrapper />
            </main>
            <Footer />
          </ErrorBoundary>
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
