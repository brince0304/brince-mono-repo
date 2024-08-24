import React from 'react';

const CommentSkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 animate-pulse">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 ml-auto"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
          <div className="mt-3">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSkeleton;
