"use client";

import { CommentQueryOptions } from "@/hooks/comment/queries";
import { convertToCommentProps } from "@/lib/notion/convert";
import { Comment, Text } from "@brince-mono-repo/shared-components";
import { Skeleton } from "@brince-mono-repo/shared-components";
import { wrap } from "@suspensive/react";
import { SuspenseQuery } from "@suspensive/react-query";

interface CommentsProps {
	pageId: string;
}

const Comments = wrap
	.Suspense({ fallback: <Skeleton.Comment /> })
	.on<CommentsProps>(({ pageId }) => (
		<SuspenseQuery {...CommentQueryOptions.getComments(pageId)}>
			{({ data }) => {
				return (
					<section className="flex flex-col gap-1 mt-4" data-id={"comments"}>
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
						{data.length === 0 && (
							<Text variant={"p"} className={"text-muted-foreground"}>
								첫번째 댓글을 남겨주세요 🙃
							</Text>
						)}
					</section>
				);
			}}
		</SuspenseQuery>
	));

export default Comments;
