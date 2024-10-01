import { postService } from '@/services/post';
import { queryOptions } from '@tanstack/react-query';

const DEFAULT_POST_KEY = 'post';

export const PostQueryKeys = {
  ALL: [DEFAULT_POST_KEY] as const,
  all: () => [DEFAULT_POST_KEY],

  GET_POSTS: [DEFAULT_POST_KEY, 'posts'] as const,
  getPosts: () => [...PostQueryKeys.GET_POSTS],
};

export const PostQueryOptions = {
  getPosts: () =>
    queryOptions({
      queryKey: PostQueryKeys.getPosts(),
      queryFn: () => postService.getPosts(),
      select: (res) => res.data,
      retry: false,
    }),
};
