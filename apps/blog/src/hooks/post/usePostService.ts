import { type UseMutationOptions, useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { PostQueryKeys, PostQueryOptions } from '.';
import { postService } from '@/services/post';
import { toast } from 'sonner';
import { useRef } from 'react';

export const useLikePost = (
  pageId: string,
  option?: UseMutationOptions,
) => {
  const queryClient = useQueryClient();
  const clickedRef = useRef(false);

  const { data: { isLiked, likeCount} } = useSuspenseQuery(PostQueryOptions.getPostLike(pageId));

  const mutation = useMutation({
    mutationFn: () => {
      if (clickedRef.current || isLiked) {
        throw new Error('이미 좋아요를 누르셨어요');
      }
      return postService.postLikePage({ pageId, currentLikeCount: likeCount });
    },
    ...option,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PostQueryKeys.getPostLike(pageId) });
      clickedRef.current = true;
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : '이미 좋아요를 누르셨어요 😊');
    },
  });

  return {
    ...mutation,
    likeCount,
    isLiked,
  };
};
