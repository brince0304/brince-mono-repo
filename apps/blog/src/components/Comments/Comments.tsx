"use client";

import { CommentQueryOptions } from "@/hooks/comment/queries";
import { convertToCommentProps } from "@/lib/notion/convert";
import { Comment, Text } from "@brince-mono-repo/shared-components";
import { Skeleton } from "@brince-mono-repo/shared-components";
import { SuspenseQuery } from "@suspensive/react-query";
import { Suspense } from "react";

interface CommentsProps {
	pageId: string;
}

const Comments = ({ pageId }: CommentsProps) => {
	return (
		<Suspense fallback={<Skeleton.Comment />}>
			<SuspenseQuery {...CommentQueryOptions.getComments(pageId)}>
				{({ data }) => (
					<section className="flex flex-col gap-1 mt-4">
						<div className="flex items-center mb-6">
							<Text
								variant={"h3"}
								className="border-b-2 border-gray-200 dark:border-gray-700 pb-2 w-auto font-bold"
							>
								댓글 {data.length}개
							</Text>
						</div>
						{data.map((comment) => (
							<Comment
								key={comment.created_time + comment.id}
								{...convertToCommentProps(comment)}
							/>
						))}
					</section>
				)}
			</SuspenseQuery>
		</Suspense>
	);
};

export default Comments;
