'use client'

import LikeButton from '../LikeButton/LikeButton';
import ShareButton from '../ShareButton/ShareButton';
import CommentSheetTrigger from '../Comments/CommentSheetTrigger';
import { useEffect, useState, useRef, useCallback } from 'react';
import CommentDrawerTrigger from '../Comments/CommentDrawerTrigger';

interface LikeAndShareProps {
  pageId: string;
  column?: boolean;
  className?: string;
}

const PostFloatingButton = ({ pageId, column = false, className = '' }: LikeAndShareProps) => (
  <div className={`flex ${column ? 'flex-col' : ''} gap-2 ${className}`}>
    <LikeButton pageId={pageId} />
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
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-[200%]'
        }`}
    >
      <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-lg">
        <LikeButton className="w-10 h-10" variant="ghost" pageId={pageId} />
        <CommentDrawerTrigger pageId={pageId} pageTitle={''} className="w-10 h-10" variant="ghost" />
        <ShareButton variant="ghost" className="w-10 h-10" />
      </div>
    </div>
  );
};

export { PostFloatingButton, MobilePostFloatingButton };
