import { PostSkeleton } from './PostSkeleton';

const PostListSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    </div>
  );
};

export { PostListSkeleton };
