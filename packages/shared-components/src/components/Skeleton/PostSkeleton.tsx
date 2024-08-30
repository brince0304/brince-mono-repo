import React from "react";

const PostSkeleton = () => {
	return (
		<div className="max-w-3xl mx-auto p-4 bg-white dark:bg-gray-800">
			{/* 제목 */}
			<div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4 animate-pulse" />

			{/* 작성자 정보 */}
			<div className="flex items-center mb-6">
				<div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 animate-pulse" />
				<div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
			</div>

			{/* 태그 */}
			<div className="flex mb-6 space-x-2">
				<div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
				<div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
				<div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
			</div>

			{/* 본문 내용 */}
			<div className="space-y-3">
				<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
				<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse" />
				<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6 animate-pulse" />
			</div>

			{/* 목차 */}
			<div className="mt-8 p-4 bg-gray-100 dark:bg-gray-750 rounded-lg">
				<div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4 animate-pulse" />
				<div className="space-y-2">
					<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
					<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
					<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
				</div>
			</div>
		</div>
	);
};

export default PostSkeleton;
