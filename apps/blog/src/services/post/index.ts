import { axiosClient } from '@/lib/client';
import type { PostLikeRequest, GetPostRequest } from '@/models/post';
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

const postLikePage = ({ pageId, count }: PostLikeRequest) => {
  return axiosClient.post(`/posts/${pageId}/like`, { count });
};

const getPosts = (getPostRequest?: GetPostRequest) => {
  return axiosClient.get<QueryDatabaseResponse>('/posts', { params: getPostRequest });
};

export const postService = {
  postLikePage,
  getPosts,
};
