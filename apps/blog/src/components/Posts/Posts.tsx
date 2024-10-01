'use client';

import PostSection from '@/components/Posts/PostSection';
import { POST_CATEGORY } from '@/lib/notion/consts';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PostQueryOptions } from '@/hooks/post/\bqueries';

const Posts = () => {
  const { isLoading, data: posts } = useQuery({ ...PostQueryOptions.getPosts() });

  const filterPostsByCategory = (category: string) =>
    posts?.filter((post) => post.properties.Category.select?.name === category);

  return (
    <section className={'flex flex-col gap-4'}>
      <PostSection
        title="Daily Musings"
        description="여러 이야기를 다룹니다"
        posts={filterPostsByCategory(POST_CATEGORY.DAILY)}
        isLoading={isLoading}
      />
      <PostSection
        title="Tech"
        description="기술 관련 이야기를 다룹니다"
        posts={filterPostsByCategory(POST_CATEGORY.TECH)}
        isLoading={isLoading}
      />
    </section>
  );
};

export default Posts;
