import { savePostLikeStatus } from "@/lib/cookie";
import { notionClient } from "@/lib/notion/notion";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(
	req: NextRequest,
	{ params }: { params: { slug: string } },
) {
	const { slug } = params;

	if (!slug) {
		return NextResponse.json(
			{ error: "페이지 ID 나 요청값이 존재하지 않습니다." },
			{ status: 400 },
		);
	}

	try {
		const data = await req.json();
		const count = data.count;

		await Promise.all([
			notionClient.updatePostLike(slug, count + 1),
			savePostLikeStatus(slug, true),
		]);

		return NextResponse.json({ status: 201 });
	} catch (error) {
		console.error("Error post Like:", error);
		return NextResponse.json(
			{ error: "좋아요에 실패하였습니다." },
			{ status: 500 },
		);
	}
}
