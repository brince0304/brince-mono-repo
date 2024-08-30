import NotionPage from "@/components/NotionPage/NotionPage";
import type { PageBySlugResponse } from "@/models/notion";
import { Badge, Text } from "@brince-mono-repo/shared-components";
import BrinceAvatar from "@brince-mono-repo/shared-components/src/components/BrnceAvatar/BrinceAvatar";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import type React from "react";

interface PostDetailProps {
	post: PageBySlugResponse;
}

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
	return (
		<article className={"flex flex-col gap-4"}>
			<section className="flex flex-col gap-3 xl:w-2/3 lg:w-4/6 w-full">
				<Text variant={"h1"} className={"font-bold"}>
					{post.page.properties.Title.title[0].plain_text}
				</Text>
				<Text variant={"large"} className="text-gray-500 dark:text-gray-400">
					{post.page.properties.Excerpt.rich_text[0].plain_text}
				</Text>
				<section className="flex gap-1 items-center">
					<div className="flex justify-center items-center gap-2">
						<BrinceAvatar className={"w-8 h-8"} />
						<Text variant={"small"}>브린스</Text>
					</div>
					<Text
						variant={"small"}
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
						<Badge variant={"secondary"} key={tag.id}>
							{tag.name}
						</Badge>
					))}
				</div>
				<div className="border-t border-gray-200 dark:border-gray-700" />
			</section>
			<NotionPage recordMap={post.recordMap} />
		</article>
	);
};

export default PostDetail;
