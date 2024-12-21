'use client';

import { Button } from '@repo/ui/ui/button';
import { HeartIcon } from 'lucide-react';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import CommentDrawerTrigger from '../Comments/CommentDrawerTrigger';
import CommentSheetTrigger from '../Comments/CommentSheetTrigger';
import LikeButton from '../LikeButton/LikeButton';
import ShareButton from '../ShareButton/ShareButton';

interface LikeAndShareProps {
  pageId: string;
  column?: boolean;
  className?: string;
}

const LikeButtonFallback = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <Button
      variant={isMobile ? 'ghost' : 'outline'}
      className={`w-12 h-12 rounded-full ${isMobile ? 'w-8 h-8' : ''}`}
      disabled
    >
      <HeartIcon className={`w-6 h-6 ${isMobile ? 'w-4 h-4' : ''}`} />
    </Button>
  );
};

const PostFloatingButton = ({ pageId, column = false, className = '' }: LikeAndShareProps) => (
  <div className={`flex ${column ? 'flex-col' : ''} gap-2 ${className}`}>
    <Suspense fallback={<LikeButtonFallback isMobile={false} />}>
      <LikeButton pageId={pageId} />
    </Suspense>
    <CommentSheetTrigger pageId={pageId} pageTitle={''} />
    <ShareButton />
  </div>
);

const MobilePostFloatingButton = ({ pageId }: { pageId: string }) => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const updateScrollVisibility = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < 100) {
      setIsVisible(true);
      lastScrollY.current = currentScrollY;
      ticking.current = false;
      return;
    }

    const scrollingDown = currentScrollY > lastScrollY.current;
    const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);

    if (scrollDelta > 5) {
      if (scrollingDown) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    }

    lastScrollY.current = currentScrollY;
    ticking.current = false;
  }, []);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        updateScrollVisibility();
      });
      ticking.current = true;
    }
  }, [updateScrollVisibility]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-[200%]'
      }`}
    >
      <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-lg">
        <Suspense fallback={<LikeButtonFallback isMobile />}>
          <LikeButton className="w-8 h-8" variant="ghost" pageId={pageId} />
        </Suspense>
        <CommentDrawerTrigger pageId={pageId} pageTitle={''} className="w-8 h-8" variant="ghost" />
        <ShareButton variant="ghost" className="w-8 h-8" />
      </div>
    </div>
  );
};

export { MobilePostFloatingButton, PostFloatingButton };
