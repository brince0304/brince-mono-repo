import { axiosClient } from '@/lib/client';
import type { PageBySlugResponse } from '@/models/notion';
import type { PostLikeRequest, GetPostRequest, GetTagsResponse } from '@/models/post';
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

const postLikePage = ({ pageId, count }: PostLikeRequest) => {
  return axiosClient.post('/likes', { pageId, count });
};

const getPostLike = (pageId: string) => {
  return axiosClient.get<{ likeCount: number; isLiked: boolean }>('/likes', {
    params: { pageId },
  });
};

const getPosts = (getPostRequest?: GetPostRequest) => {
  return axiosClient.get<QueryDatabaseResponse>('/posts', { params: getPostRequest });
};

const getTags = (nextCursor?: string | undefined) => {
  return axiosClient.get<GetTagsResponse>('/tags', { params: { nextCursor } });
};

const getPostBySlug = (slug: string) => {
  return axiosClient.get<PageBySlugResponse>(`/posts/${slug}`);
};

export const postService = {
  postLikePage,
  getPosts,
  getTags,
  getPostBySlug,
  getPostLike,
};
