import { commentService } from '@/services/comment';
import { queryOptions } from '@tanstack/react-query';

const DEFAULT_COMMENT_KEY = 'comment';

export const CommentQueryKeys = {
  ALL: [DEFAULT_COMMENT_KEY] as const,
  all: () => [DEFAULT_COMMENT_KEY],

  GET_COMMENTS: [DEFAULT_COMMENT_KEY, 'comments'] as const,
  getComments: (pageId: string) => [...CommentQueryKeys.GET_COMMENTS, pageId],
};

export const CommentQueryOptions = {
  getComments: (pageId: string) =>
    queryOptions({
      queryKey: CommentQueryKeys.getComments(pageId),
      queryFn: () => commentService.getComments(pageId),
      select: (res) => res.data,
      enabled: !!pageId,
    }),
};
