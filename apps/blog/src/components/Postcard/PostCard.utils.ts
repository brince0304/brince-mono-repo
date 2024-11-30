import type { NotionPage } from '@/models/notion';
import type { PostCardProps } from './PostCard';

export const convertToPostCardProps = (responses: NotionPage): PostCardProps => {
  if (!responses) {
    return {
      title: '',
      excerpt: '',
      imageUrl: '',
      date: '',
      tags: [],
      slug: '',
    };
  }

  const title = responses.properties.Title?.title?.[0]?.plain_text || '';
  const excerpt = responses.properties.Excerpt?.rich_text?.[0]?.plain_text || '';
  const imageUrl = responses.properties.Thumbnail?.url || '';
  const date = responses.properties.Date?.date?.start || '';
  const tags = responses.properties.Tags?.multi_select?.map((tag) => tag.name) || [];
  const slug = responses.properties.Slug?.rich_text?.[0]?.plain_text || '';

  return {
    title,
    excerpt,
    imageUrl,
    date,
    tags,
    slug,
  };
};
