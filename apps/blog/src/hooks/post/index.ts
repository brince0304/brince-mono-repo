import type { GetPostRequest } from '@/models/post';
import { postService } from '@/services/post';
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

const DEFAULT_POST_KEY = 'post';

export const PostQueryKeys = {
  ALL: [DEFAULT_POST_KEY] as const,
  all: () => [DEFAULT_POST_KEY],

  GET_POSTS: [DEFAULT_POST_KEY, 'posts'] as const,
  getPosts: (getPostRequest?: GetPostRequest) => [...PostQueryKeys.GET_POSTS, getPostRequest],

  GET_TAGS: [DEFAULT_POST_KEY, 'tags'] as const,
  getTags: (nextCursor?: string) => [...PostQueryKeys.GET_TAGS, nextCursor],
};

export const PostQueryOptions = {
  getPosts: (getPostRequest?: GetPostRequest) =>
    queryOptions({
      queryKey: PostQueryKeys.getPosts(getPostRequest),
      queryFn: () => postService.getPosts(getPostRequest),
      select: (res) => res.data,
      staleTime: 1000 * 60 * 5,
      retry: false,
    }),
  getInfiniteTags: () =>
    infiniteQueryOptions({
      queryKey: PostQueryKeys.getTags(),
      queryFn: ({ pageParam }) => postService.getTags(pageParam),
      getNextPageParam: (lastPage) => lastPage.data.nextCursor,
      initialPageParam: undefined,
      select: (response) => ({
        pages: response.pages.map((page) => page.data.tags),
        pageParams: response.pages.map((page) => page.data.nextCursor),
      }),
    }),
};
