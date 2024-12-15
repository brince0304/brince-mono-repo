'use client';

import { useLikePost } from '@/hooks/post/usePostService';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '@repo/ui/ui/button';
import { Typography } from '@repo/ui/ui/typography';
import { useState } from 'react';
import { toast } from 'sonner';
import AnimatedHeartIcon from '../AnimatedHeartIcon';
import { wrap } from '@suspensive/react';
import { PostQueryOptions } from '@/hooks/post';
import { SuspenseQuery } from '@suspensive/react-query';

interface LikeButtonProps {
  className?: string;
  pageId: string;
}

const LikeButton = wrap.Suspense({
  fallback: (
    <Button
      variant="outline"
      aria-label="게시글 좋아요 버튼 로딩중"
      className="w-12 h-12 rounded-full justify-center relative"
      size="icon"
      disabled
    >
      <div className="flex items-center justify-center absolute inset-0 gap-1">
        <ReloadIcon className="animate-spin" />
      </div>
    </Button>
  ),
}).on<LikeButtonProps>(({ className = '', pageId }) => (
  <SuspenseQuery {...PostQueryOptions.getPostLike(pageId)}>
    {({ data: { likeCount, isLiked } }) => {
      const [isAnimating, setIsAnimating] = useState(false);
      const [isClicked, setIsClicked] = useState(isLiked);

      const { mutate: likePost, isPending } = useLikePost(
        { pageId, currentLikeCount: likeCount },
        {
          onSuccess: () => {
            toast.success('좋아요를 눌렀어요 😊');
            setIsClicked(true);
          },
          onError: () => {
            toast.error('이미 좋아요를 누르셨어요 😊');
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
            {!isPending && <AnimatedHeartIcon isLiked={isClicked || isLiked} />}
            {isPending && <ReloadIcon className="animate-spin" />}
            <Typography className="xsmall">{likeCount}</Typography>
          </div>
        </Button>
      );
    }}
  </SuspenseQuery>
));

export default LikeButton;
