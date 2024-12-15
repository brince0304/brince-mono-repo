import type { Viewport } from 'next';
import type { ReactNode } from 'react';
import './global.css';
import { cn } from '@/lib/utils';
import { pretendard } from '@/lib/font';
import ReactQueryProvider from '@/components/ReactQueryProvider';
import { ErrorBoundary } from '@suspensive/react';
import CustomError from '@/components/Error/CustomError/CustomError';
import { ThemeProvider } from 'next-themes';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { Header } from './_components/Header';
import ToastContainerWrapper from '@/components/Toast/ToastContainer/ToastContainerWrapper';
import { Footer } from '@repo/ui/Footer';

export const viewport: Viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  userScalable: false,
};

const menuItems = [
  { name: '홈', path: '/' },
  { name: '포스트', path: '/posts' },
  // { name: '시리즈', path: '/series' },
];

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ko" className={`scroll-smooth light ${pretendard.variable}`}>
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
        <ReactQueryProvider>
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
            <ThemeProvider attribute="class" defaultTheme={'system'}>
              <div className="min-h-screen flex flex-col transition-colors duration-300">
                <ProgressBar />
                <Header menuItems={menuItems} />
                <main className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5">
                  {children}
                  <ToastContainerWrapper />
                </main>
                <Footer />
              </div>
            </ThemeProvider >
          </ErrorBoundary>
        </ReactQueryProvider>
      </body>
    </html >
  );
}
