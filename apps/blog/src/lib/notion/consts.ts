export const COMMENT_DATABASE_ID = process.env.NOTION_COMMENT_DATABASE_ID as string;
export const POST_DATABASE_ID = process.env.NOTION_DATABASE_ID as string;
export const NOTION_TOKEN = process.env.NOTION_TOKEN as string;

export const NOTION_PROPERTY = {
  TITLE: 'Title',
  EXCERPT: 'Excerpt',
  TAGS: 'Tags',
  CATEGORY: 'Category',
  SERIES: 'Series',
  PUBLISHED: 'Published',
  THUMBNAIL: 'Thumbnail',
  SLUG: 'Slug',
  COMMENTS: 'Comments',
  LIKES: 'Likes',
  LIKED: 'Liked',
  CREATED_AT: 'CreatedAt',
} as const;

export const POST_CATEGORY = {
  TECH: 'Tech',
  DAILY: 'Daily',
} as const;
