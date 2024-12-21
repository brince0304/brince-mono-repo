'use client';

import { useLikePost } from '@/hooks/post/usePostService';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Button, type ButtonProps } from '@repo/ui/ui/button';
import AnimatedHeartIcon from '../AnimatedHeartIcon';
import { useRef } from 'react';

interface LikeButtonProps {
  className?: string;
  pageId: string;
}

const LikeButton = ({ className = '', pageId, ...props }: LikeButtonProps & ButtonProps) => {
  const clikedRef = useRef(false);

  const { mutate: likePost, isPending, isLiked } = useLikePost(
    pageId,
  );

  return (
    <Button
      variant="outline"
      aria-label="게시글 좋아요 버튼"
      className={`w-12 h-12 rounded-full justify-center relative ${className}`}
      size="icon"
      onClick={() => likePost()}
      disabled={isPending}
      {...props}
    >
      <div className="flex items-center justify-center absolute inset-0 gap-1">
        {!isPending && <AnimatedHeartIcon isLiked={clikedRef.current || isLiked} />}
        {isPending && <ReloadIcon className="animate-spin" />}
      </div>
    </Button>
  );
};

export default LikeButton;
