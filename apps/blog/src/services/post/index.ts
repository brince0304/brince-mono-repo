import { axiosClient } from '@/lib/client';
import type { PostLikeRequest, GetPostRequest, GetTagsResponse } from '@/models/post';
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

const postLikePage = ({ pageId, count }: PostLikeRequest) => {
  return axiosClient.post(`/posts/${pageId}/like`, { count });
};

const getPosts = (getPostRequest?: GetPostRequest) => {
  return axiosClient.get<QueryDatabaseResponse>('/posts', { params: getPostRequest });
};

const getTags = (nextCursor?: string | undefined) => {
  return axiosClient.get<GetTagsResponse>('/posts/tags', { params: { nextCursor } });
};

export const postService = {
  postLikePage,
  getPosts,
  getTags,
};
