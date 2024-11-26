import { convertToPostCardProps } from '@/lib/notion/convert';
import type { NotionPage } from '@/models/notion';
import { PostCard } from '@repo/ui/PostCard';

interface PostListProps {
  posts: NotionPage[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <ul className={'flex flex-col gap-4'}>
      {posts
        .map((post) => convertToPostCardProps(post))
        .map((props, index) => (
          <PostCard.Horizontal key={props.slug} {...props} priority={index === 0} />
        ))}
    </ul>
  );
};

export default PostList;
