'use client';

import { Button, type ButtonProps } from '@repo/ui/ui/button';
import { Share2 } from 'lucide-react';
import useCopyPostLink from '../../_hooks/useCopyPostLink';

interface ShareButtonProps {
  className?: string;
}

const ShareButton = ({ className = '', ...props }: ShareButtonProps & ButtonProps) => {
  const { copyPostLink } = useCopyPostLink();

  return (
    <Button
      variant="outline"
      aria-label="게시글 공유 버튼"
      className={`w-12 h-12 rounded-full justify-center relative ${className}`}
      size="icon"
      onClick={copyPostLink}
      {...props}
    >
      <Share2 className="w-5 h-5" />
    </Button>
  );
};

export default ShareButton;
