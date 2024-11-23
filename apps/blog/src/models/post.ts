import type { MyProperties } from './notion';

export interface PostLikeRequest {
  pageId: string;
  count: number;
}
export interface GetPostRequest {
  page?: number;
  pageSize?: number;
  sort?: 'ascending' | 'descending';
  sortBy?: MyProperties;
  search?: string;
  tags?: string;
}

export interface GetTagsResponse {
  tags: string[];
  nextCursor: null | undefined;
}
