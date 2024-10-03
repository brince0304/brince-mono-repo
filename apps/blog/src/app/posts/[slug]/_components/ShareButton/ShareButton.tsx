'use client';

import { Button } from '@repo/ui/ui/button';
import { Share2 } from 'lucide-react';
import type React from 'react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
interface ShareButtonProps {
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ className = '' }) => {
  const [isCopying, setIsCopying] = useState(false);

  const handleCopy = useCallback(async () => {
    setIsCopying(true);
    try {
      const title = document.title;
      const url = window.location.href;
      const textToCopy = `${title}\n${url}`;

      await navigator.clipboard.writeText(textToCopy);
      toast.success('포스트 링크가 클립보드에 복사됐어요 🤗');
    } catch (error) {
      console.error('복사 중 오류 발생:', error);
      toast.error('복사 중 오류가 발생했어요 😢');
    } finally {
      setIsCopying(false);
    }
  }, []);

  return (
    <Button
      variant="outline"
      className={`w-12 h-12 rounded-full justify-center relative ${className}`}
      size="icon"
      onClick={handleCopy}
      disabled={isCopying}
    >
      <Share2 className="w-5 h-5" />
    </Button>
  );
};

export default ShareButton;
