import { getPostLikeStatus, savePostLikeStatus } from "@/lib/cookie";
import { notionClient } from "@/lib/notion/notion";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(
	req: NextRequest,
	{ params }: { params: { slug: string } },
) {
	const slug = params.slug;

	if (!slug) {
		return NextResponse.json(
			{ error: "페이지 ID 나 요청값이 존재하지 않습니다." },
			{ status: 400 },
		);
	}
	const isLiked = await getPostLikeStatus(slug);

	if (isLiked) {
		return NextResponse.json(
			{ error: "이미 좋아요를 누르셨습니다." },
			{ status: 400 },
		);
	}

	try {
		const post = await notionClient.getPageBySlug(slug);
		if (!post) return;

		const currentLikeCount = post.page.properties.Likes.number;
		const pageId = post.page.id;

		await notionClient.updatePostLike(pageId, currentLikeCount + 1);

		await savePostLikeStatus(slug, isLiked);

		return NextResponse.json({ status: 201 });
	} catch (error) {
		console.error("Error post Like:", error);
		return NextResponse.json(
			{ error: "좋아요에 실패하였습니다." },
			{ status: 500 },
		);
	}
}
