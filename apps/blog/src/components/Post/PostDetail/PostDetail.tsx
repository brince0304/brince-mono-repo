import LikeButton from "@/components/Buttons/LikeButton/LikeButton";
import LikeShareButton from "@/components/Buttons/LikeShareButton/LikeShareButton";
import ShareButton from "@/components/Buttons/ShareButton/ShareButton";
import CommentForm from "@/components/Comment/CommentForm/CommentForm";
import Comments from "@/components/Comment/Comments/Comments";
import NotionPage from "@/components/NotionPage/NotionPage";
import { getPostLikeStatus } from "@/lib/cookie";
import type { PageBySlugResponse } from "@/models/notion";
import { Badge, Text } from "@brince-mono-repo/shared-components";
import BrinceAvatar from "@brince-mono-repo/shared-components/src/components/BrnceAvatar/BrinceAvatar";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import type React from "react";

interface PostDetailProps {
	post: PageBySlugResponse;
	slug: string;
}

const PostDetail: React.FC<PostDetailProps> = async ({ post, slug }) => {
	const isLiked = await getPostLikeStatus(slug);

	return (
		<article className="flex gap-4 max-w-3xl w-full relative sm:px-0">
			<div className="hidden lg:block sticky top-1/4 h-fit">
				<LikeShareButton slug={slug} isLiked={isLiked} />
			</div>
			<div className="flex flex-col w-full flex-1 lg:ml-4 gap-4">
				<header className="flex flex-col gap-3">
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
				</header>
				<NotionPage recordMap={post.recordMap} />
				<div className="lg:hidden mt-4 flex gap-4">
					<LikeButton slug={slug} isLiked={isLiked} />
					<ShareButton />
				</div>
				<Comments pageId={post.page.id} />
				<div className="border-t border-gray-200 dark:border-gray-700" />
				<CommentForm pageId={post.page.id} />
			</div>
		</article>
	);
};

export default PostDetail;
