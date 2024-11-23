'use client';

import { wrap } from '@suspensive/react';
import { PostListSkeleton } from '@repo/ui/skeletons/PostListSkeleton';
import { Typography } from '@repo/ui/ui/typography';
import { SuspenseQuery } from '@suspensive/react-query';
import { PostQueryOptions } from '@/hooks/post';
import PostList from '@/components/Posts/PostList';
import type { NotionPage } from '@/models/notion';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const PostListBody = wrap
  .Suspense({ fallback: <PostListSkeleton /> })
  .ErrorBoundary({
    fallback: (
      <div className="flex flex-col gap-4">
        <Typography variant="p">게시글을 불러오는 중 오류가 발생했어요 🥲</Typography>
      </div>
    ),
  })
  .on(() => {
    const [mounted, setMounted] = useState(false);
    const searchParams = useSearchParams();

    if (!mounted) return <PostListSkeleton />;

    const search = searchParams.get('search') ?? undefined;
    const tags = searchParams.get('tag') ?? undefined;

    useEffect(() => {
      setMounted(true);
    }, []);

    return (
      <SuspenseQuery
        {...PostQueryOptions.getPosts({
          search,
          tags,
        })}
      >
        {(data) => {
          return <PostList posts={data.data.results as NotionPage[]} />;
        }}
      </SuspenseQuery>
    );
  });

export default PostListBody;
