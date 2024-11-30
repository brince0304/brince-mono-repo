'use client';

import PostSection from '@/app/_components/PostSection';

import { useQuery } from '@tanstack/react-query';
import { PostQueryOptions } from '@/hooks/post';
import type { NotionPage } from '@/models/notion';
import { useIsMounted } from '@toss/react';

const Posts = () => {
  const isMounted = useIsMounted();
  const { isLoading, data: posts } = useQuery({ ...PostQueryOptions.getPosts() });

  if (!isMounted) return null;

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
