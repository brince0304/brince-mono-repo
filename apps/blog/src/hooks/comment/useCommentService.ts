import { CommentQueryOptions } from '@/hooks/comment';
import type { CommentRequest, CommentRequestParameters } from '@/models/notion';
import { commentService } from '@/services/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostComment = (parameters: Omit<CommentRequestParameters, 'data'>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestData: CommentRequest) => commentService.postComment({ ...parameters, data: requestData }),
    onSuccess: () => {
      queryClient.invalidateQueries(CommentQueryOptions.getComments(parameters.pageId));
    },
  });
};
