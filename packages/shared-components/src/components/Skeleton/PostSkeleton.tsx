import React from "react";
import { Skeleton } from "../ui/Skeleton";

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

export default PostSkeleton;
