import PostDetail from "@/components/Post/PostDetail/PostDetail";
import { serverFetcher } from "@/lib/client";
import { BLOG_URL } from "@/lib/consts";
import type { PageBySlugResponse } from "@/models/notion";
import type { Metadata } from "next";

export async function generateMetadata({
	params,
}: { params: { slug: string } }): Promise<Metadata> {
	const article = await serverFetcher<PageBySlugResponse>(
		`/posts/${params.slug}`,
	);

	return {
		title: article?.page.properties.Title.title[0].plain_text,
		description: article?.page.properties.Excerpt.rich_text[0].plain_text,
		authors: [
			{
				url: BLOG_URL,
				name: "브린스",
			},
		],
		keywords: article?.page.properties.Tags.multi_select.map((tag) => tag.name),
		robots: "index, follow",
		openGraph: {
			type: "article",
			locale: "ko_KR",
			title: article?.page.properties.Title.title[0].plain_text,
			description: article?.page.properties.Excerpt.rich_text[0].plain_text,
			images: [{ url: article?.page.properties.Thumbnail.url ?? "" }],
			url: `${BLOG_URL}/posts/${params.slug}`,
		},
	};
}

export default async function Post({ params }: { params: { slug: string } }) {
	const post = await serverFetcher<PageBySlugResponse>(`/posts/${params.slug}`);

	return (
		<div className="flex justify-center">
			<PostDetail post={post} slug={params.slug} />
		</div>
	);
}
