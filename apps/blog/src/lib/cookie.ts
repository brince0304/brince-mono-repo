import { cookies } from "next/headers";

export async function getPostLikeStatus(slug: string): Promise<boolean> {
	const cookieStore = cookies();
	const likedPosts = cookieStore.get("likedPosts");

	if (!likedPosts) {
		return false;
	}

	try {
		const likedPostsArray = JSON.parse(likedPosts.value);
		console.log("likedPostsArray", likedPostsArray);
		return likedPostsArray.includes(slug);
	} catch (error) {
		console.error("쿠키 파싱 중 오류 발생:", error);
		return false;
	}
}

export async function savePostLikeStatus(slug: string, isLiked: boolean) {
	const cookieStore = cookies();
	const likedPosts = cookieStore.get("likedPosts");

	if (!likedPosts) {
		cookieStore.set("likedPosts", JSON.stringify([slug]));
		return;
	}

	try {
		const likedPostsArray = JSON.parse(likedPosts.value);
		const updatedLikedPosts = isLiked
			? likedPostsArray.filter((likedSlug: string) => likedSlug !== slug)
			: [...likedPostsArray, slug];
		cookieStore.set("likedPosts", JSON.stringify(updatedLikedPosts));
	} catch (error) {
		console.error("쿠키 파싱 중 오류 발생:", error);
	}
}
