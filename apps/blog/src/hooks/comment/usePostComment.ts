import { CommentQueryKeys } from '@/hooks/comment/queries';
import type { CommentRequest } from '@/models/notion';
import { commentService } from '@/services/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePostComment = (pageId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CommentRequest) => commentService.postComment(pageId, data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CommentQueryKeys.getComments(pageId) });
    },
  });
};

export default usePostComment;
