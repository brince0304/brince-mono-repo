import { axiosClient } from '@/lib/client';
import type { NotionPagesResponse } from '@/models/notion';
import type { PostLikeRequest, GetPostRequest } from '@/models/post';

const postLikePage = ({ pageId, count }: PostLikeRequest) => {
  return axiosClient.post(`/posts/${pageId}/like`, { count });
};

const getPosts = (getPostRequest?: GetPostRequest) => {
  return axiosClient.get<NotionPagesResponse>('/posts', { params: getPostRequest });
};

export const postService = {
  postLikePage,
  getPosts,
};
