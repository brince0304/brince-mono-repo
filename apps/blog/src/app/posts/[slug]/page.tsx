import PostDetail from "@/components/Post/PostDetail/PostDetail";
import { serverFetcher } from "@/lib/client";
import { generateBlogPostMetadata } from "@/lib/utils/metadata";
import type { PageBySlugResponse } from "@/models/notion";
import type { Metadata } from "next";

export async function generateMetadata({
	params,
}: { params: { slug: string } }): Promise<Metadata> {
	const article = await serverFetcher<PageBySlugResponse>(
		`/posts/${params.slug}`,
	);

	return generateBlogPostMetadata(article.page);
}

export const revalidate = 10;

export default async function Post({ params }: { params: { slug: string } }) {
	const post = await serverFetcher<PageBySlugResponse>(`/posts/${params.slug}`);

	return (
		<div className="flex">
			<PostDetail post={post} slug={params.slug} />
		</div>
	);
}
