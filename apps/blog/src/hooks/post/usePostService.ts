import type { PostLikeRequest } from "@/models/post";
import { postService } from "@/services/post";
import { type UseMutationOptions, useMutation } from "@tanstack/react-query";

export const useLikePost = (
	request: PostLikeRequest,
	option?: UseMutationOptions,
) => {
	return useMutation({
		mutationFn: () => postService.postLikePage(request),
		...option,
	});
};
