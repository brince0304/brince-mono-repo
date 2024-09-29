import { convertToPostCardProps } from '@/lib/notion/convert';
import type { NotionPage } from '@/models/notion';

import { PostCard } from '@repo/ui/PostCard';
import type React from 'react';

interface PostListProps {
  posts: NotionPage[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <ul className={'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'}>
      {posts
        .map((post) => convertToPostCardProps(post))
        .map((props, index) => (
          <PostCard key={props.slug} {...props} priority={index === 0} />
        ))}
    </ul>
  );
};

export default PostList;
