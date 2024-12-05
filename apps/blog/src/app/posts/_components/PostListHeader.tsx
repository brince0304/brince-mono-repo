'use client';

import PostTags from './PostTags';
import PostSearch from './PostSearchBox';
import PostCategorySelector from './PostCategorySelector';
import { wrap } from '@suspensive/react';

const PostListHeader = wrap.Suspense().on(
  () => (
    <div className="sticky top-[56px] z-10 backdrop-blur-sm py-4 border-b border-border bg-background/95 flex flex-col gap-4 -mx-4">
      <div className="flex space-x-4 px-4">
        <PostSearch />
        <PostCategorySelector />
      </div>

      <div className="flex space-x-2 px-4">
        <PostTags />
      </div>
    </div>
  )
);

export default PostListHeader;
