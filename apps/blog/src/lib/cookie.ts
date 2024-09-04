import { cookies } from "next/headers";

export async function getPostLikeStatus(pageId: string): Promise<boolean> {
	const cookieStore = cookies();
	const likedPosts = cookieStore.get("likedPosts");

	if (!likedPosts) {
		return false;
	}

	try {
		const likedPostsArray = JSON.parse(likedPosts.value);
		console.log("likedPostsArray", likedPostsArray);
		return likedPostsArray.includes(pageId);
	} catch (error) {
		console.error("쿠키 파싱 중 오류 발생:", error);
		return false;
	}
}

export async function savePostLikeStatus(pageId: string, isLiked: boolean) {
	const cookieStore = cookies();
	const likedPostsCookie = cookieStore.get("likedPosts");

	let likedPosts: string[] = [];

	if (likedPostsCookie) {
		try {
			likedPosts = JSON.parse(likedPostsCookie.value);
			if (!Array.isArray(likedPosts)) {
				throw new Error("Invalid cookie value");
			}
		} catch (error) {
			console.error("쿠키 파싱 중 오류 발생:", error);
			likedPosts = [];
		}
	}

	const pageIndex = likedPosts.indexOf(pageId);
	if (isLiked && pageIndex === -1) {
		likedPosts.push(pageId);
	} else if (!isLiked && pageIndex !== -1) {
		likedPosts.splice(pageIndex, 1);
	}

	cookieStore.set("likedPosts", JSON.stringify(likedPosts), {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 30 * 24 * 60 * 60, // 30 days
	});
}
