import Posts from '@/components/Posts/Posts';
import QueryHydrationBoundary from '@/components/QueryHydrationBoundary';
import { PostQueryOptions } from '@/hooks/post';
import { ProfileCard } from '@repo/ui/ProfileCard';

export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <main className={'flex flex-col mx-auto gap-4'}>
      <ProfileCard />
      <QueryHydrationBoundary queryOptions={PostQueryOptions.getPrefetchPosts()}>
        <Posts />
      </QueryHydrationBoundary>
    </main>
  );
}
