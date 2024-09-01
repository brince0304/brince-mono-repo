import { axiosClient } from "@/lib/client";

const postLikePage = (slug: string) => {
	return axiosClient.post(`/posts/${slug}/like`);
};

export const postService = {
	postLikePage,
};
