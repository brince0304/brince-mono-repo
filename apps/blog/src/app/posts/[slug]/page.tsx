import CommentForm from "@/components/CommentForm/CommentForm";
import Comments from "@/components/Comments/Comments";
import NotionPage from "@/components/NotionPage/NotionPage";
import { notionClient } from "@/lib/notion/notion";
import { Avatar, Chip, Text } from "@brince-mono-repo/shared-components";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import type { Metadata } from "next";

export async function generateMetadata({
	params,
}: { params: { slug: string } }): Promise<Metadata> {
	const article = await notionClient.getPageBySlug(params.slug);
	return {
		title: article?.page.properties.Title.title[0].plain_text,
		description: article?.page.properties.Excerpt.rich_text[0].plain_text,
		authors: [
			{
				url: "https://brince.dev",
				name: "브린스",
			},
		],
		openGraph: {
			title: article?.page.properties.Title.title[0].plain_text,
			description: article?.page.properties.Excerpt.rich_text[0].plain_text,
			images: [
				{
					url: article?.page.properties.Thumbnail.url ?? "",
				},
			],
		},
	};
}
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
					<section className="flex xl:w-2/3 lg:w-4/6 w-full flex-col gap-4">
						<Comments pageId={post.page.id} />
						<div className="border-t border-gray-200 dark:border-gray-700" />
						<CommentForm pageId={post.page.id} />
					</section>
				)}
			</>
		</>
	);
}
