import DailyPosts from '@/components/Posts/DailyPosts';
import TechPosts from '@/components/Posts/TechPosts';
import { POST_CATEGORY } from '@/lib/notion/consts';

import { serverFetcher } from '@/lib/client';
import type { NotionPage } from '@/models/notion';
import React from 'react';

const Posts = async () => {
  const posts = await serverFetcher<NotionPage[]>('/posts', {
    cache: 'no-store',
  });

  if (!posts || posts.length === 0) {
    return null;
  }

  const techPosts = posts.filter(
    (post) => post.properties.Category.select?.name === POST_CATEGORY.TECH
  );

  const dailyPosts = posts.filter(
    (post) => post.properties.Category.select?.name === POST_CATEGORY.DAILY
  );

  return (
    <section className={'flex flex-col gap-4'}>
      <DailyPosts posts={dailyPosts} />
      <TechPosts posts={techPosts} />
    </section>
  );
};

export default Posts;
