import CommentForm from "@/components/Comment/CommentForm/CommentForm";
import Comments from "@/components/Comment/Comments/Comments";
import PostDetail from "@/components/Post/PostDetail/PostDetail";
import { serverFetcher } from "@/lib/client";
import type { PageBySlugResponse } from "@/models/notion";
import type { Metadata } from "next";
import { useTheme } from "next-themes";

// export async function generateMetadata({
// 	params,
// }: { params: { slug: string } }): Promise<Metadata> {
// 	const article = await serverFetcher<PageBySlugResponse>(
// 		`/posts/${params.slug}`,
// 	);
//
// 	return {
// 		title: article?.page.properties.Title.title[0].plain_text,
// 		description: article?.page.properties.Excerpt.rich_text[0].plain_text,
// 		authors: [
// 			{
// 				url: "https://brince.dev",
// 				name: "브린스",
// 			},
// 		],
// 		openGraph: {
// 			title: article?.page.properties.Title.title[0].plain_text,
// 			description: article?.page.properties.Excerpt.rich_text[0].plain_text,
// 			images: [
// 				{
// 					url: article?.page.properties.Thumbnail.url ?? "",
// 				},
// 			],
// 		},
// 	};
// }
export default async function Post({ params }: { params: { slug: string } }) {
	const post = await serverFetcher<PageBySlugResponse>(`/posts/${params.slug}`);

	return (
		<>
			<PostDetail post={post} />
			{!!post.page.id && (
				<section className="flex xl:w-2/3 lg:w-4/6 w-full flex-col gap-4">
					<Comments pageId={post.page.id} />
					<div className="border-t border-gray-200 dark:border-gray-700" />
					<CommentForm pageId={post.page.id} />
				</section>
			)}
		</>
	);
}
