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

  GET_CATEGORIES: [DEFAULT_POST_KEY, 'categories'] as const,
  getCategories: () => [...PostQueryKeys.GET_CATEGORIES],

  GET_POST_LIKE: [DEFAULT_POST_KEY, 'likes', 'pageId'] as const,
  getPostLike: (pageId: string) => [...PostQueryKeys.GET_POST_LIKE, pageId],
};

export const PostQueryOptions = {
  getInfinitePosts: (getPostRequest?: GetPostRequest) =>
    infiniteQueryOptions({
      queryKey: PostQueryKeys.getPosts(getPostRequest),
      queryFn: ({ pageParam }) => postService.getPosts(getPostRequest, pageParam),
      getNextPageParam: (lastPage) => lastPage.next_cursor ?? null,
      initialPageParam: '',
      select: (response) => {
        return {
          pages: response.pages.map((page) => page.results),
          pageParams: response.pages.map((page) => page.next_cursor),
        };
      },
    }),
  getInfiniteTags: () =>
    infiniteQueryOptions({
      queryKey: PostQueryKeys.getTags(),
      queryFn: ({ pageParam }) => postService.getTags(pageParam),
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
      initialPageParam: '',
      select: (response) => ({
        pages: response.pages.map((page) => page.tags),
        pageParams: response.pages.map((page) => page.nextCursor),
      }),
    }),
  getCategories: () =>
    queryOptions({
      queryKey: PostQueryKeys.getCategories(),
      queryFn: () => postService.getPostCategories(),
    }),
  getPostLike: (pageId: string) =>
    queryOptions({
      queryKey: PostQueryKeys.getPostLike(pageId),
      queryFn: () => postService.getPostLike(pageId),
    }),
} as const;
