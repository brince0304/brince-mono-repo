import type { CommentRequest, NotionPagesResponse } from '@/models/notion';
import axios from 'axios';

const getComments = (pageId: string) => {
  return axios.get<NotionPagesResponse>('/api/comments', { params: { pageId } });
};

const postComment = (pageId: string, data: CommentRequest) => {
  return axios.post('/api/comments', { pageId, data });
};

export const commentService = {
  getComments,
  postComment,
};
