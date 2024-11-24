'use client';

import { wrap } from '@suspensive/react';
import { PostListSkeleton } from '@repo/ui/skeletons/PostListSkeleton';
import { Typography } from '@repo/ui/ui/typography';
import { SuspenseQuery } from '@suspensive/react-query';
import { PostQueryOptions } from '@/hooks/post';
import PostList from '@/components/Posts/PostList';
import type { NotionPage } from '@/models/notion';
import { useIsMounted } from '@toss/react';
import { useQueryString } from '@repo/utils/hooks';

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
    const isMounted = useIsMounted();
    const { search, tag, category } = useQueryString(['search', 'tag', 'category']);

    if (!isMounted) return <PostListSkeleton />;

    return (
      <SuspenseQuery
        {...PostQueryOptions.getPosts({
          search,
          tag,
          category,
        })}
      >
        {(data) => {
          return <PostList posts={data.data.results as NotionPage[]} />;
        }}
      </SuspenseQuery>
    );
  });

export default PostListBody;
