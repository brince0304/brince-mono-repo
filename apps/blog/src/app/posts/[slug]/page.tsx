import CommentForm from "@/components/CommentForm/CommentForm";
import Comments from "@/components/Comments/Comments";
import NotionPage from "@/components/NotionPage";
import { notionClient } from "@/lib/notion/notion";
import { Avatar, Chip, Text } from "@brince-mono-repo/shared-components";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export default async function Post({ params }: { params: { slug: string } }) {
	const post = await notionClient.getPageBySlug(params.slug);

	if (!post) {
		return <div>Post not found</div>;
	}

	return (
		<>
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
			<>
				{!!post.page.id && (
					<section className="flex xl:w-2/3 flex-col gap-8">
						<Comments pageId={post.page.id} />
						<CommentForm pageId={post.page.id} />
					</section>
				)}
			</>
		</>
	);
}
