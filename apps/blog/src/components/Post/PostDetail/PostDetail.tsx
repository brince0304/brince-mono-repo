import NotionPage from "@/components/NotionPage/NotionPage";
import type { PageBySlugResponse } from "@/models/notion";
import {
	Avatar,
	Chip,
	Skeleton,
	Text,
} from "@brince-mono-repo/shared-components";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import type React from "react";

interface PostDetailProps {
	post: PageBySlugResponse;
}

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
	if (!post.page) {
		return <Skeleton.Post />;
	}

	return (
		<article>
			<section className="flex flex-col gap-2 mb-4">
				<Text variant={"h1"}>
					{post.page.properties.Title.title[0].plain_text}
				</Text>
				<Text variant={"body"} className="text-gray-500 dark:text-gray-400">
					{post.page.properties.Excerpt.rich_text[0].plain_text}
				</Text>
				<section className="flex gap-1 items-center">
					<div className="flex items-center gap-2">
						<Avatar size={32} owner={true} />
						<Text variant={"body"}>브린스</Text>
					</div>
					<Text
						variant={"body"}
						className="text-gray-500 dark:text-gray-400 before:content-['·'] before:mr-1"
					>
						{formatDistanceToNow(
							new Date(post.page.properties.Date.date?.start || ""),
							{
								addSuffix: true,
								locale: ko,
							},
						)}
					</Text>
				</section>
				<div className="flex flex-wrap gap-2">
					{post.page.properties.Tags.multi_select.map((tag) => (
						<Chip
							shape={"square"}
							color={"neutral"}
							text={tag.name}
							hoverEffect={true}
							key={tag.id}
						/>
					))}
				</div>
			</section>
			<NotionPage recordMap={post.recordMap} />
		</article>
	);
};

export default PostDetail;
