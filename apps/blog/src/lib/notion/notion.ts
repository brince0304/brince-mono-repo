import { COMMENT_DATABASE_ID, NOTION_TOKEN, POST_DATABASE_ID } from '@/lib/notion/consts';
import type {
  CommentRequest,
  NotionMultiSelect,
  NotionPage,
  NotionProperties,
} from '@/models/notion';
import type { GetPostRequest } from '@/models/post';
import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';

export const notion = new Client({ auth: NOTION_TOKEN });
const notionAPI = new NotionAPI();

// sitemap 생성에 사용
async function getPosts() {
  try {
    const response = await notion.databases.query({
      database_id: POST_DATABASE_ID,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
      page_size: 10,
    });
    return response.results as NotionPage[];
  } catch (error) {
    console.log(error);
  }
}

async function getPostsByParams(params: GetPostRequest) {
  try {
    const response = await notion.databases.query({
      database_id: POST_DATABASE_ID,
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      filter: params.filter as any,
      sorts: [
        {
          property: params.sortBy || 'Date',
          direction: params.sort || 'descending',
        },
      ],
      page_size: params.pageSize || 10,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

async function updatePostLike(pageId: string, count: number) {
  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        Likes: {
          type: 'number',
          number: count,
        },
      },
    });
  } catch (error) {
    console.error('Error liking post:', error);
  }
}

async function unlikePost(pageId: string) {
  try {
    const response = await notion.pages.update({
      page_id: pageId,
      properties: {
        Likes: {
          type: 'number',
          number: 0,
        },
      },
    });

    return response;
  } catch (error) {
    console.error('Error unliking post:', error);
  }
}

async function createCommentPage(pageId: string, data: CommentRequest) {
  try {
    const { text, author, parentId } = data;

    await notion.pages.create({
      parent: {
        database_id: COMMENT_DATABASE_ID,
      },
      properties: {
        PageId: {
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content: pageId,
              },
            },
          ],
        },
        Comment: {
          type: 'title',
          title: [
            {
              type: 'text',
              text: {
                content: text,
              },
            },
          ],
        },
        Author: {
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content: author,
              },
            },
          ],
        },
        ParentId: {
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content: parentId || '',
              },
            },
          ],
        },
      },
    });
  } catch (error) {
    console.error('Error creating comment page:', error);
  }
}

async function updatePostProperties(pageId: string | undefined, properties: NotionProperties) {
  if (!pageId) {
    return;
  }

  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        ...properties,
      },
    });
  } catch (error) {
    console.error('Error updating post properties:', error);
  }
}

async function getComments(pageId: string) {
  try {
    const response = await notion.databases.query({
      database_id: COMMENT_DATABASE_ID,
      filter: {
        property: 'PageId',
        rich_text: {
          equals: pageId,
        },
      },
      sorts: [
        {
          property: 'CreatedAt',
          direction: 'ascending',
        },
      ],
    });

    return response.results;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}

async function getPageBySlug(slug: string) {
  try {
    const response = await notion.databases.query({
      database_id: POST_DATABASE_ID,
      filter: {
        property: 'Slug',
        rich_text: {
          equals: slug,
        },
      },
      page_size: 1,
    });

    const page = response.results[0] as NotionPage;

    const recordMap = await notionAPI.getPage(page.id);

    return {
      page,
      recordMap,
    };
  } catch (error) {
    console.error('Error fetching page:', error);
  }
}

async function getAllTags(nextCursor?: string) {
  try {
    const response = await notion.databases.query({
      database_id: POST_DATABASE_ID,
      start_cursor: nextCursor as string | undefined,
      page_size: 1,
      filter: {
        property: 'Tags',
        type: 'multi_select',
        multi_select: {
          is_not_empty: true,
        },
      },
    });
    const result = response.results as NotionPage[];

    const values = result.flatMap((page: NotionPage) => {
      const property = page.properties.Tags;
      return property.multi_select.map(
        (item: NotionMultiSelect['multi_select'][number]) => item.name
      );
    });

    return {
      tags: values.filter((value, index, self) => self.indexOf(value) === index),
      nextCursor: response.next_cursor || undefined,
      hasMore: response.has_more,
    };
  } catch (error) {
    console.error('Error fetching property values from Notion:', error);
    throw error;
  }
}

export const notionClient = {
  getPosts,
  getPostsByParams,
  getComments,
  createCommentPage,
  getPageBySlug,
  updatePostProperties,
  updatePostLike,
  getAllTags,
};
