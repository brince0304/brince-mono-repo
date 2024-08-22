import type {
  PageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';

interface NotionUser {
  object: 'user';
  id: string;
}

interface NotionParent {
  type: 'database_id';
  database_id: string;
}

interface NotionRichTextProperty {
  id: string;
  type: 'rich_text';
  rich_text: NotionRichText[];
}

interface NotionRichText {
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

interface NotionTitle {
  id: string;
  type: 'title';
  title: NotionRichText[];
}

interface NotionDate {
  id: string;
  type: 'date';
  date: {
    start: string;
    end: string | null;
    time_zone: string | null;
  } | null;
}

interface NotionURL {
  id: string;
  type: 'url';
  url: string | null;
}

interface NotionCheckbox {
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

interface NotionMultiSelect {
  id: string;
  type: 'multi_select';
  multi_select: {
    id: string;
    name: string;
    color: string;
  }[];
}

interface NotionNumber {
  id: string;
  type: 'number';
  number: number;
}

interface NotionCreatedTime {
  id: string;
  type: 'created_time';
  created_time: string;
}

interface NotionProperties {
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

export interface CommentRequest {
  text: string;
  author: string;
  parentId?: string;
}
