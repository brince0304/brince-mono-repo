import type {
  PageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import type { ExtendedRecordMap } from 'notion-types';

const myProperties = [
  'Title',
  'Date',
  'Excerpt',
  'Published',
  'Thumbnail',
  'Slug',
  'Tags',
  'Comments',
  'Likes',
  'Liked',
  'CreatedAt',
  'Category',
  'Views',
];

export type MyProperties = (typeof myProperties)[number];

export interface NotionUser {
  object: 'user';
  id: string;
}

export interface NotionParent {
  type: 'database_id';
  database_id: string;
}

export interface NotionRichTextProperty {
  id: string;
  type: 'rich_text';
  rich_text: NotionRichText[];
}

export interface NotionRichText {
  type: 'text';
  text: {
    content: string;
    link: string | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
}

export interface NotionTitle {
  id: string;
  type: 'title';
  title: NotionRichText[];
}

export interface NotionDate {
  id: string;
  type: 'date';
  date: {
    start: string;
    end: string | null;
    time_zone: string | null;
  } | null;
}

export interface NotionURL {
  id: string;
  type: 'url';
  url: string | null;
}

export interface NotionCheckbox {
  id: string;
  type: 'checkbox';
  checkbox: boolean;
}

interface NotionSelect {
  id: string;
  type: 'select';
  select: {
    id: string;
    name: string;
    color: string;
  } | null;
}

export interface NotionMultiSelect {
  id: string;
  type: 'multi_select';
  multi_select: {
    id: string;
    name: string;
    color: string;
  }[];
}

export interface NotionNumber {
  id: string;
  type: 'number';
  number: number;
}

export interface NotionCreatedTime {
  id: string;
  type: 'created_time';
  created_time: string;
}

export interface NotionProperties {
  Title: NotionTitle;
  Date: NotionDate;
  Excerpt: NotionRichTextProperty;
  Published: NotionCheckbox;
  Thumbnail: NotionURL;
  Slug: NotionRichTextProperty;
  Tags: NotionMultiSelect;
  Comments: NotionNumber;
  Likes: NotionNumber;
  Liked: NotionCheckbox;
  CreatedAt: NotionCreatedTime;
  Category: NotionSelect;
  Views: NotionNumber;
}

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
