import { axiosClient } from '@/lib/client';
import type { PageBySlugResponse } from '@/models/notion';
import type { PostLikeRequest, GetPostRequest, GetTagsResponse } from '@/models/post';
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import type { PostLikeResponse } from '@/models/post';

const postLikePage = async ({ pageId, currentLikeCount: count }: PostLikeRequest) => {
  const { data } = await axiosClient.post<PostLikeResponse>('/likes', { pageId, count });
  return data;
};

const getPostLike = async (pageId: string) => {
  const { data } = await axiosClient.get<PostLikeResponse>('/likes', {
    params: { pageId },
  });
  return data;
};

const getPosts = async (getPostRequest?: GetPostRequest, startCursor: string | undefined = undefined) => {
  const { data } = await axiosClient.get<QueryDatabaseResponse>('/posts', { params: { ...getPostRequest, start_cursor: startCursor } });
  return data;
};

const getTags = async (nextCursor?: string | undefined ) => {
  const { data } = await axiosClient.get<GetTagsResponse>('/tags', { params: { nextCursor } });
  return data;
};

const getPostBySlug = async (slug: string) => {
  const { data } = await axiosClient.get<PageBySlugResponse>(`/posts/${slug}`);
  return data;
};

const getPostCategories = async () => {
  const { data } = await axiosClient.get<string[]>('/categories');
  return data;
};

export const postService = {
  postLikePage,
  getPosts,
  getTags,
  getPostBySlug,
  getPostLike,
  getPostCategories,
};
