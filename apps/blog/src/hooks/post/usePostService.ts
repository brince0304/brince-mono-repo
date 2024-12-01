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
    onSuccess: (data, variables, context) => {
      option?.onSuccess?.(data, variables, context);
      queryClient.invalidateQueries({ queryKey: PostQueryKeys.getPostLike(request.pageId) });
    },
    onError: (error, variables, context) => {
      option?.onError?.(error, variables, context);
    },
  });
};
