import { Button } from '@repo/ui/ui/button';
import { LayoutList, LayoutGrid } from 'lucide-react';
import { TextGrid } from '@repo/ui/TextGrid';

import PostListHeader from './_components/PostListHeader';
import PostListBody from './_components/PostList';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function Post() {
  return (
    <div>
      <TextGrid title="Posts" description="최신 블로그 포스트를 확인해보세요 🔖" />
      <PostListHeader />

      <div className="flex justify-end mb-4 space-x-2">
        <Button variant="outline" size="icon">
          <LayoutList className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <LayoutGrid className="h-4 w-4" />
        </Button>
      </div>

      <PostListBody />
    </div>
  );
}
