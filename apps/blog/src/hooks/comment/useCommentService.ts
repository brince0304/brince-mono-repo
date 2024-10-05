import { CommentQueryKeys } from '@/hooks/comment';
import type { CommentRequest } from '@/models/notion';
import { commentService } from '@/services/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostComment = ({ pageId, parentId }: { pageId: string; parentId?: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CommentRequest) => commentService.postComment({ pageId, data, parentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CommentQueryKeys.getComments(pageId),
      });
    },
  });
};
