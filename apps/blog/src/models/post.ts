import type { MyProperties } from './notion';

export interface PostLikeRequest {
  pageId: string;
  currentLikeCount: number;
}
export interface GetPostRequest {
  page?: number;
  pageSize?: number;
  sort?: 'ascending' | 'descending';
  sortBy?: MyProperties;
  search?: string;
  tag?: string;
  category?: string;
  series?: string;
}

export interface GetTagsResponse {
  tags: string[];
  nextCursor: null | undefined;
}

export interface PostLikeResponse {
  likeCount: number;
  isLiked: boolean;
}
