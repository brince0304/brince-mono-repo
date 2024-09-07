import { ProfileCard } from '@brince-mono-repo/shared-components';
import Posts from '@/components/Posts/Posts';

const MainPage = () => {
  return (
    <main className={'mx-auto'}>
      <ProfileCard />
      <Posts />
    </main>
  );
};

export default MainPage;
