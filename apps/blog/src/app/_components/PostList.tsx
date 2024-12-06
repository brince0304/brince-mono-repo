'use client';

import { convertToPostCardProps } from '@/components/Postcard/PostCard.utils';
import type { NotionPage } from '@/models/notion';
import { PostCard } from '@/components/Postcard/PostCard';

interface PostListProps {
  posts: NotionPage[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <ul className={'flex flex-col gap-4'}>
      {posts
        .map((post) => convertToPostCardProps(post))
        .map((props) => (
          <PostCard.Horizontal key={props.slug} {...props} />
        ))}
    </ul>
  );
};

export default PostList;
