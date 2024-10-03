import type { GetPostRequest } from '@/models/post';
import { postService } from '@/services/post';
import { queryOptions } from '@tanstack/react-query';

const DEFAULT_POST_KEY = 'post';

export const PostQueryKeys = {
  ALL: [DEFAULT_POST_KEY] as const,
  all: () => [DEFAULT_POST_KEY],

  GET_POSTS: [DEFAULT_POST_KEY, 'posts'] as const,
  getPosts: (getPostRequest?: GetPostRequest) => [...PostQueryKeys.GET_POSTS, getPostRequest],
};

export const PostQueryOptions = {
  getPosts: (getPostRequest?: GetPostRequest) =>
    queryOptions({
      queryKey: PostQueryKeys.getPosts(getPostRequest),
      queryFn: () => postService.getPosts(getPostRequest),
      select: (res) => res.data,
      retry: false,
    }),
};
