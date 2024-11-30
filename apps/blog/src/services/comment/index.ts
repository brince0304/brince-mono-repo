import type { CommentRequest, NotionPagesResponse } from '@/models/notion';
import { axiosClient } from '@/lib/client';

const getComments = (pageId: string) => {
  return axiosClient.get<NotionPagesResponse>('/comments', { params: { pageId } });
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
