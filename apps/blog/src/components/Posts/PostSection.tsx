'use client';

import PostList from '@/components/Posts/PostList';
import type { NotionPage } from '@/models/notion';
import { TextGrid } from '@repo/ui/TextGrid';
import { UISkeleton } from '@repo/ui/UISkeleton';
import { motion } from 'framer-motion';

interface PostSectionProps {
  title: string;
  description: string;
  isLoading: boolean;
  posts?: NotionPage[];
}

const PostSection = ({ title, description, posts, isLoading }: PostSectionProps) => {
  return (
    <motion.section
      className={'flex flex-col gap-4'}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <TextGrid title={title} description={description} />
      {isLoading && <UISkeleton.PostList />}
      {posts && <PostList posts={posts} />}
    </motion.section>
  );
};

export default PostSection;
