import { generateHomeMetadata } from '@/lib/meta';
import { ProfileCard } from '@/app/_components/ProfileCard';
import type { Metadata } from 'next';
import PostSection from './_components/PostSection';
import { notionClient } from '@/lib/notion/notion';

export const generateMetadata = async (): Promise<Metadata> => {
  return generateHomeMetadata();
};

export const dynamic = 'force-static';

export default async function HomePage() {
  const posts = await notionClient.getPosts();

  return (
    <main className={'flex flex-col mx-auto gap-4 min-h-screen'}>
      <ProfileCard />
      <section className={'flex flex-col gap-4'}>
        <PostSection
          title="최근 포스트"
          description="여러 이야기를 다루고 있어요 🤗"
          posts={posts}
        />
      </section>
    </main>
  );
}
