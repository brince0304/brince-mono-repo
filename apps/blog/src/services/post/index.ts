import { axiosClient } from "@/lib/client";
import type { PostLikeRequest } from "@/models/post";

const postLikePage = ({ pageId, count }: PostLikeRequest) => {
	return axiosClient.post(`/posts/${pageId}/like`, { count });
};

export const postService = {
	postLikePage,
};
