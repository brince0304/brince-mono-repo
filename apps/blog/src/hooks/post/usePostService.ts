import { type UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { PostQueryKeys } from '.';
import type { PostLikeRequest } from '@/models/post';
import { postService } from '@/services/post';

export const useLikePost = (
  request: PostLikeRequest,
  option?: UseMutationOptions,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postService.postLikePage(request),
    ...option,
    onSuccess: (...args) => {
      option?.onSuccess?.(...args);
      queryClient.invalidateQueries({ queryKey: PostQueryKeys.getPostLike(request.pageId) });
    },
    onError: (...args) => {
      option?.onError?.(...args);
    },
  });
};
