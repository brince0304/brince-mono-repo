'use client';

import PostList from '@/components/Posts/PostList';
import type { NotionPage } from '@/models/notion';
import { TextGrid } from '@repo/ui/TextGrid';
import { motion } from 'framer-motion';
import type React from 'react';

interface TechPostsProps {
  posts: NotionPage[];
}

const TechPosts: React.FC<TechPostsProps> = ({ posts }) => {
  return (
    <motion.section
      className={'flex flex-col'}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <TextGrid title="Tech" description="개발에 관련된 얘기를 다룹니다." />
      <PostList posts={posts} />
    </motion.section>
  );
};

export default TechPosts;
