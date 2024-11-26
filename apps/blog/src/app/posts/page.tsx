import { TextGrid } from '@repo/ui/TextGrid';

import PostListHeader from './_components/PostListHeader';
import PostListBody from './_components/PostListBody';
import { generatePostsMetadata } from '@/lib/meta';
import type { Metadata } from 'next';
import QueryHydrationBoundary from '@/components/QueryHydrationBoundary';
import { PostQueryOptions } from '@/hooks/post';

export const generateMetadata = async (): Promise<Metadata> => {
  return generatePostsMetadata();
};

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function PostsPage() {
  return (
    <main>
      <TextGrid title="포스트" description="최신 블로그 포스트를 확인해보세요 🔖" />
      <QueryHydrationBoundary queryOptions={PostQueryOptions.getCategories()}>
        <PostListHeader />
      </QueryHydrationBoundary>

      <section className="flex flex-col gap-4 py-6">
        <PostListBody />
      </section>
    </main>
  );
}
