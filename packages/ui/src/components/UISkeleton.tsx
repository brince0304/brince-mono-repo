'use client';

import { CommentSkeletons } from './skeletons/CommentSkeletons';
import { PostListSkeleton } from './skeletons/PostListSkeleton';
import { PostSkeleton } from './skeletons/PostSkeleton';

const UISkeleton = {
  Comment: CommentSkeletons,
  Post: PostSkeleton,
  PostList: PostListSkeleton,
};

export { UISkeleton };
