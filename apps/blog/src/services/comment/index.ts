import type { CommentRequest, NotionPagesResponse } from '@/models/notion';
import {axiosClient} from "@/lib/client";

const getComments = (pageId: string) => {
  return axiosClient.get<NotionPagesResponse>('/comments', { params: { pageId } });
};

const postComment = (pageId: string, data: CommentRequest) => {
  return axiosClient.post('/comments', { pageId, data });
};

export const commentService = {
  getComments,
  postComment,
};
