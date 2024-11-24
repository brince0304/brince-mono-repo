import { TextGrid } from '@repo/ui/TextGrid';

import PostListHeader from './_components/PostListHeader';
import PostListBody from './_components/PostListBody';
import { generatePostsMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import QueryHydrationBoundary from '@/components/QueryHydrationBoundary';
import { PostQueryOptions } from '@/hooks/post';

export const metadata: Metadata = generatePostsMetadata();

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function Post() {
  return (
    <div>
      <TextGrid title="포스트" description="최신 블로그 포스트를 확인해보세요 🔖" />
      <QueryHydrationBoundary queryOptions={PostQueryOptions.getCategories()}>
        <PostListHeader />
      </QueryHydrationBoundary>

      <div className="flex flex-col gap-4 py-6">
        <PostListBody />
      </div>
    </div>
  );
}
