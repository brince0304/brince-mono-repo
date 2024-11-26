'use client';

import PostList from '@/components/Posts/PostList';
import type { NotionPage } from '@/models/notion';
import { TextGrid } from '@repo/ui/TextGrid';
import { UISkeleton } from '@repo/ui/UISkeleton';

interface PostSectionProps {
  title: string;
  description: string;
  isLoading: boolean;
  posts?: NotionPage[];
}

const PostSection = ({ title, description, posts, isLoading }: PostSectionProps) => {
  return (
    <section className={'flex flex-col gap-4'}>
      <TextGrid title={title} description={description} />
      {isLoading && <UISkeleton.PostList />}
      {posts && <PostList posts={posts} />}
    </section>
  );
};

export default PostSection;
