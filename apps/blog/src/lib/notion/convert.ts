import type { NotionPage } from '@/models/notion';

interface PostCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  tags: string[];
  slug: string;
  likes: number;
  comments: number;
}

export const convertToPostCardProps = (responses: NotionPage): PostCardProps => {
  if (typeof responses === 'undefined' || responses === null) {
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

  return {
    title: responses.properties.Title.title[0].plain_text || '',
    excerpt: responses.properties.Excerpt.rich_text[0]?.plain_text || '',
    imageUrl: responses.properties.Thumbnail.url || '',
    date: responses.properties.Date.date?.start || '',
    tags: responses.properties.Tags.multi_select.map((tag) => tag.name) || [],
    slug: responses.properties.Slug.rich_text[0].plain_text,
    likes: responses.properties.Likes.number,
    comments: responses.properties.Comments.number,
  };
};

interface CommentProps {
  author: string;
  content: string;
  createdAt: string;
  liked: boolean;
  owner: boolean;
}

export function convertToCommentProps(comment: NotionPage): CommentProps {
  return {
    author: comment.properties.Author.rich_text[0].plain_text,
    content: comment.properties.Comment.title[0].plain_text,
    createdAt: comment.properties.CreatedAt.created_time,
    liked: comment.properties.Liked.checkbox,
    owner: comment.properties.Owner.checkbox,
  };
}
