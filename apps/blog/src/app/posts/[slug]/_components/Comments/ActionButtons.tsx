'use client';

import { Button } from '@repo/ui/ui/button';
import { HeartFilledIcon } from '@radix-ui/react-icons';
import { Loader2, Share2Icon } from 'lucide-react';
import { Typography } from '@repo/ui/ui/typography';
import { useCallback } from 'react';
import { toast } from 'sonner';
import { useLikePost } from '@/hooks/post/usePostService';
import AnimatedHeartIcon from '../AnimatedHeartIcon';

interface ActionButtonsProps {
  pageId: string;
  likeCount: number;
  isLiked: boolean;
}

export function ActionButtons({ pageId, likeCount, isLiked }: ActionButtonsProps) {
  const { mutate: likePost, isPending } = useLikePost(
    { pageId, count: likeCount },
    {
      onSuccess: () => {
        toast.success('좋아요를 눌렀어요 😊');
      },
      onError: () => {
        toast.error('이미 좋아요를 누르셨어요 😊');
      }
    }
  );

  const handleLikePost = () => {
    if (isLiked) {
      toast.error('이미 좋아요를 누르셨어요 😊');
      return;
    }

    likePost();
  };

  const handleCopy = useCallback(async () => {
    try {
      const title = document.title;
      const url = window.location.href;
      const textToCopy = `${title}\n${url}`;

      await navigator.clipboard.writeText(textToCopy);
      toast.success('포스트 링크가 클립보드에 복사됐어요 🤗');
    } catch (error) {
      console.error('복사 중 오류 발생:', error);
      toast.error('복사 중 오류가 발생했어요 😢');
    }
  }, []);

  return (
    <div className="flex">
      <Button
        variant="transparent"
        className="text-foreground"
        disabled={isPending}
        onClick={handleLikePost}
        aria-label="좋아요"
        type="button"
      >
        {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
        {!isPending && (
          isLiked ? (
            <HeartFilledIcon className="w-4 h-4 text-red-500" />
          ) : (
            <AnimatedHeartIcon />
          )
        )}
        <Typography variant={'small'} className="font-bold">
          {likeCount}
        </Typography>
      </Button>
      <Button
        variant="transparent"
        className="text-foreground"
        onClick={handleCopy}
        aria-label="복사"
        type="button"
      >
        <Share2Icon className="w-4 h-4" />
      </Button>
    </div>
  );
} 
