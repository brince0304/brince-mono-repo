import Posts from '@/components/Post/Posts/Posts';
import { ProfileCard } from '@brince-mono-repo/shared-components';

export default async function Home() {
  return (
    <main className={'mx-auto'}>
      <ProfileCard />
      <Posts />
    </main>
  );
}
