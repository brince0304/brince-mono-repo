'use client';

import PostTags from './PostTags';
import PostSearchBox from './PostSearchBox';

const PostListHeader = () => {
  return (
    <div className="sticky top-[56px] z-10 backdrop-blur-sm py-4 border-b border-border bg-background flex flex-col gap-4">
      <PostSearchBox />
      <div className="flex space-x-2">
        <PostTags />
      </div>
    </div>
  );
};

export default PostListHeader;
