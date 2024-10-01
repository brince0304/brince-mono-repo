import type { NotionPage } from '@/models/notion';
import type { CommentProps } from '@repo/ui/Comment';
import type { PostCardProps } from '@repo/ui/PostCard';

export const convertToPostCardProps = (responses: NotionPage): PostCardProps => {
  if (!responses) {
    return {
      title: '',
      excerpt: '',
      imageUrl: '',
      date: '',
      tags: [],
      slug: '',
      likes: 0,
      comments: 0,
    };
  }

  const title = responses.properties.Title?.title?.[0]?.plain_text || '';
  const excerpt = responses.properties.Excerpt?.rich_text?.[0]?.plain_text || '';
  const imageUrl = responses.properties.Thumbnail?.url || '';
  const date = responses.properties.Date?.date?.start || '';
  const tags = responses.properties.Tags?.multi_select?.map((tag) => tag.name) || [];
  const slug = responses.properties.Slug?.rich_text?.[0]?.plain_text || '';
  const likes = responses.properties.Likes?.number ?? 0;
  const comments = responses.properties.Comments?.number ?? 0;

  return {
    title,
    excerpt,
    imageUrl,
    date,
    tags,
    slug,
    likes,
    comments,
  };
};

export function convertToCommentProps(comment: NotionPage): CommentProps {
  return {
    id: comment.id,
    author: comment.properties.Author.rich_text[0].plain_text,
    content: comment.properties.Comment.title[0].plain_text,
    createdAt: comment.properties.CreatedAt.created_time,
    liked: comment.properties.Liked.checkbox,
    owner: comment.properties.Owner.checkbox,
  };
}
