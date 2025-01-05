import type { MyProperties } from './notion';

export interface PostLikeRequest {
  pageId: string;
  currentLikeCount: number;
}
export interface GetPostRequest {
  pageSize?: number;
  start_cursor?: string | undefined;
  sort?: 'ascending' | 'descending';
  sortBy?: MyProperties;
  search?: string;
  tag?: string;
  category?: string;
  series?: string;
}

export interface GetTagsResponse {
  tags: string[];
  nextCursor: string | null;
}

export interface PostLikeResponse {
  likeCount: number;
  isLiked: boolean;
}
