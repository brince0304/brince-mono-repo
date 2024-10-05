'use client';

import PostSection from '@/components/Posts/PostSection';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PostQueryOptions } from '@/hooks/post';
import type { NotionPage } from '@/models/notion';

const Posts = () => {
  const { isLoading, data: posts } = useQuery({ ...PostQueryOptions.getPosts() });

  return (
    <section className={'flex flex-col gap-4'}>
      <PostSection
        title="최근 포스트"
        description="여러 이야기를 다루고 있어요 🤗"
        posts={posts?.results as NotionPage[]}
        isLoading={isLoading}
      />
    </section>
  );
};

export default Posts;
