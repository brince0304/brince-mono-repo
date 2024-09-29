'use client';

import React from 'react';
import { Skeleton } from './ui/skeleton';

const CommentSkeleton = () => (
  <div className="flex space-x-4 mb-4">
    <Skeleton className="h-10 w-10 rounded-full" />
    <div className="flex-1">
      <Skeleton className="h-4 w-24 mb-2" />
      <Skeleton className="h-4 w-full" />
    </div>
  </div>
);

const CommentSkeletons = () => {
  return (
    <div className="w-full max-w-2xl mx-auto my-8 space-y-6">
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
    </div>
  );
};

const PostSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
};

const UISkeleton = {
  Comment: CommentSkeletons,
  Post: PostSkeleton,
};

export { UISkeleton };
