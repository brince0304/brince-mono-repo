'use client';

import type { NotionPage } from '@/models/notion';
import { TextGrid } from '@repo/ui/TextGrid';
import { useIsMounted } from '@toss/react';
import PostList from './PostList';

interface PostSectionProps {
  title: string;
  description: string;
  posts?: NotionPage[];
}

const PostSection = ({ title, description, posts }: PostSectionProps) => {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <section className={'flex flex-col gap-4'}>
      <TextGrid title={title} description={description} />
      {posts && <PostList posts={posts} />}
    </section>
  );
};

export default PostSection;
