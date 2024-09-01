import { postService } from "@/services/post";
import { type UseMutationOptions, useMutation } from "@tanstack/react-query";

const useLikePost = (slug: string, option?: UseMutationOptions) => {
	return useMutation({
		mutationFn: () => postService.postLikePage(slug),
		...option,
	});
};

export default useLikePost;
