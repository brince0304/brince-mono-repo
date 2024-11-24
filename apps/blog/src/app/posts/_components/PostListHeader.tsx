'use client';

import PostTags from './PostTags';
import PostSearch from './PostSearchBox';
import PostCategorySelector from './PostCategorySelector';

const PostListHeader = () => {
  return (
    <div className="sticky top-[56px] z-10 backdrop-blur-sm py-4 border-b border-border bg-background flex flex-col gap-4 -mx-4">
      <div className="flex space-x-4 px-4">
        <PostSearch />
        <PostCategorySelector />
      </div>

      <div className="flex space-x-2 px-4">
        <PostTags />
      </div>
    </div>
  );
};

export default PostListHeader;
