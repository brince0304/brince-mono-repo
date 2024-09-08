import { ProfileCard } from '@brince-mono-repo/shared-components';
import Posts from '@/components/Posts/Posts';

export default async function Home() {
  return (
    <main className={'mx-auto'}>
      <ProfileCard />
      <Posts />
    </main>
  );
}
