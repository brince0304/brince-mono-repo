import { axiosClient } from '@/lib/client';
import type { NotionPagesResponse } from '@/models/notion';
import type { PostLikeRequest } from '@/models/post';

const postLikePage = ({ pageId, count }: PostLikeRequest) => {
  return axiosClient.post(`/posts/${pageId}/like`, { count });
};

const getPosts = () => {
  return axiosClient.get<NotionPagesResponse>('/posts');
};

export const postService = {
  postLikePage,
  getPosts,
};
