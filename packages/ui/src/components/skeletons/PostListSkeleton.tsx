import { PostCardSkeleton } from './PostCardSkeleton';

const PostListSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
      </div>
    </div>
  );
};

export { PostListSkeleton };
