import { serverFetcher } from '@/lib/client';
import { generateHomeMetadata } from '@/lib/meta';
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { ProfileCard } from '@repo/ui/ProfileCard';
import type { Metadata } from 'next';
import PostSection from './_components/PostSection';
import type { NotionPage } from '@/models/notion';

export const generateMetadata = async (): Promise<Metadata> => {
  return generateHomeMetadata();
};

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const posts = await serverFetcher<QueryDatabaseResponse>('/posts');

  return (
    <main className={'flex flex-col mx-auto gap-4'}>
      <ProfileCard />
      <section className={'flex flex-col gap-4'}>
        <PostSection
          title="최근 포스트"
          description="여러 이야기를 다루고 있어요 🤗"
          posts={posts?.results as NotionPage[]}
        />
      </section>
    </main>
  );
}
