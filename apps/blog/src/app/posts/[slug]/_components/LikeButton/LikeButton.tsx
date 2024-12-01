'use client';
import { useLikePost } from '@/hooks/post/usePostService';
import { HeartFilledIcon, ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '@repo/ui/ui/button';
import { Typography } from '@repo/ui/ui/typography';
import type React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';
import AnimatedHeartIcon from '../AnimatedHeartIcon';

interface LikeButtonProps {
  className?: string;
  isLiked: boolean;
  pageId: string;
  count: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ className = '', isLiked, pageId, count }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClicked, setIsClicked] = useState(isLiked);

  const { mutate: likePost, isPending } = useLikePost(
    { pageId, count },
    {
      onSuccess: () => {
        setIsClicked(true);
      },
    },
  );

  const handleLikePost = () => {
    if (isClicked || isLiked) {
      toast.error('이미 좋아요를 누르셨어요 😊');
      return;
    }

    setIsAnimating(true);
    likePost();
  };

  return (
    <Button
      variant="outline"
      aria-label="게시글 좋아요 버튼"
      className={`w-12 h-12 rounded-full justify-center relative ${className}
            ${!isAnimating ? 'overflow-hidden' : ''}`}
      size="icon"
      onClick={handleLikePost}
      disabled={isPending}
    >
      <div className="flex items-center justify-center absolute inset-0 gap-1">
        {!isPending && isClicked && <HeartFilledIcon className="w-4 h-4 text-red-500" />}
        {!isPending && !isClicked && <AnimatedHeartIcon />}
        {isPending && <ReloadIcon className="animate-spin" />}
        <Typography className="xsmall">{count}</Typography>
      </div>
    </Button>
  );
};

export default LikeButton;
