import Posts from '@/components/Posts/Posts';
import { ProfileCard } from '@repo/ui/ProfileCard';

export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <main className={'mx-auto'}>
      <ProfileCard />
      <Posts />
    </main>
  );
}
