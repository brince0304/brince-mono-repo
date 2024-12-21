import type { CommentRequest, NotionPagesResponse } from '@/models/notion';
import { axiosClient } from '@/lib/client';

const getComments = async (pageId: string) => {
  const { data } = await axiosClient.get<NotionPagesResponse>('/comments', { params: { pageId } });
  return data;
};

const postComment = ({
  pageId,
  data,
  parentId,
  pageTitle,
}: { pageId: string; data: CommentRequest; parentId?: string; pageTitle: string }) => {
  return axiosClient.post('/comments', { pageId, data, parentId, pageTitle });
};

export const commentService = {
  getComments,
  postComment,
};
