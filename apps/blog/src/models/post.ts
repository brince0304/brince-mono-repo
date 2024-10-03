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
  filter?: {
    property: MyProperties;
    checkbox?: {
      equals: boolean;
    };
    rich_text?: {
      equals: string;
    };
    number?: {
      equals: number;
    };
    date?: {
      equals: string;
    };
    relation?: {
      contains: string;
    };
  };
}
