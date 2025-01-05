import type { NotionUser, NotionProperties, NotionParent } from '@/types/notion';
import type {
  PageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import type { ExtendedRecordMap } from 'notion-types';

export interface NotionPage extends PageObjectResponse {
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: NotionUser;
  last_edited_by: NotionUser;
  properties: NotionProperties & {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    [key: string]: any;
  };
  parent: NotionParent;
  archived: boolean;
  url: string;
}

export interface NotionDatabaseQueryResponse extends QueryDatabaseResponse {
  object: 'list';
  results: NotionPage[];
  next_cursor: string | null;
  has_more: boolean;
}

export type NotionPagesResponse = NotionDatabaseQueryResponse['results'];

export interface PageBySlugResponse {
  page: NotionPage;
  recordMap: ExtendedRecordMap;
  isLiked: boolean;
}

export interface CommentRequest {
  text: string;
  author: string;
  avatar: string;
  parentId?: string;
}

export interface CommentRequestParameters {
  pageId: string;
  data: CommentRequest;
  parentId?: string;
  pageTitle: string;
}
