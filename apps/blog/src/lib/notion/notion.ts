import { COMMENT_DATABASE_ID, NOTION_TOKEN, POST_DATABASE_ID } from '@/lib/notion/consts';
import type {
  CommentRequestParameters,
  NotionPage,
} from '@/models/notion';
import type { NotionMultiSelect, NotionProperties } from '@/types/notion';
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
    console.error('getPosts error', error);
  }
}

async function getPostsByParams(params: GetPostRequest) {
  const { search, tag, category, sort_by = 'Date', sort = 'descending', page_size = 10, start_cursor } = params;

  const filters = [];

  filters.push({
    property: 'Published',
    checkbox: { equals: true },
  });

  if (search && category !== 'series') {
    filters.push({
      or: [
        { property: 'Title', rich_text: { contains: search } },
        { property: 'Excerpt', rich_text: { contains: search } },
      ],
    });
  }

  // 태그 필터
  if (tag) {
    filters.push({
      property: 'Tags',
      multi_select: { contains: tag },
    });
  }

  // 카테고리 필터
  if (category) {
    if (category === 'series' && search) {
      filters.push({
        property: 'Series',
        select: { equals: search },
      });
    } else {
      filters.push({
        property: 'Category',
        select: { equals: category },
      });
    }
  }

  try {
    return await notion.databases.query({
      database_id: POST_DATABASE_ID,
      filter: { and: filters },
      sorts: [{ property: sort_by, direction: sort }],
      page_size,
      start_cursor,
    });
  } catch (error) {
    console.error('getPostsByParams error:', error);
    throw error;
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

async function getPostLikeCount(pageId: string) {
  try {
    const response = await notion.pages.retrieve({ page_id: pageId }) as NotionPage;
    return response.properties.Likes.number;
  } catch (error) {
    console.error('Error getting post like count:', error);
  }
}

// async function unlikePost(pageId: string) {
//   try {
//     const response = await notion.pages.update({
//       page_id: pageId,
//       properties: {
//         Likes: {
//           type: 'number',
//           number: 0,
//         },
//       },
//     });

//     return response;
//   } catch (error) {
//     console.error('Error unliking post:', error);
//   }
// }

async function createCommentPage(parameters: CommentRequestParameters) {
  try {
    const { pageId, data, parentId, pageTitle } = parameters;

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
                content: data.text,
              },
            },
          ],
        },
        Avatar: {
          type: 'url',
          url: data.avatar,
        },
        Author: {
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content: data.author,
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
        PageTitle: {
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content: pageTitle,
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
      start_cursor: nextCursor ? nextCursor : undefined,
      page_size: 3,
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

async function getAllCategories() {
  try {
    const response = await notion.databases.query({
      database_id: POST_DATABASE_ID,
      filter: {
        property: 'Category',
        type: 'select',
        select: {
          is_not_empty: true,
        },
      },
    });

    const result = response.results as NotionPage[];

    return result.map((page: NotionPage) => page.properties.Category.select?.name);
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

export const getPostSeries = async () => {
  const response = await notion.databases.query({
    database_id: POST_DATABASE_ID,
    page_size: 100,
    filter: {
      and: [
        {
          property: 'Series',
          select: {
            is_not_empty: true,
          },
        },
        {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  });

  return response.results;
};

export const notionClient = {
  getPosts,
  getPostsByParams,
  getComments,
  getPostLikeCount,
  createCommentPage,
  getPageBySlug,
  updatePostProperties,
  updatePostLike,
  getAllTags,
  getAllCategories,
  getPostSeries,
};
