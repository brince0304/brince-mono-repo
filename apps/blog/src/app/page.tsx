import Posts from '@/components/Posts/Posts';
import QueryHydrationBoundary from '@/components/QueryHydrationBoundary';
import { PostQueryOptions } from '@/hooks/post';
import { generateHomeMetadata } from '@/lib/meta';
import { ProfileCard } from '@repo/ui/ProfileCard';
import type { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
  return generateHomeMetadata();
};

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  return (
    <main className={'flex flex-col mx-auto gap-4'}>
      <ProfileCard />
      <QueryHydrationBoundary queryOptions={PostQueryOptions.getPrefetchPosts()}>
        <Posts />
      </QueryHydrationBoundary>
    </main>
  );
}
