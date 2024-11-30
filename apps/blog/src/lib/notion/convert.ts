import type { NotionPage } from '@/models/notion';
import type { CommentProps } from '@repo/ui/Comment';

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
