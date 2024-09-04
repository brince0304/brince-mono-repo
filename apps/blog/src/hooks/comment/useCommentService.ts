import { CommentQueryKeys } from "@/hooks/comment/queries";
import type { CommentRequest } from "@/models/notion";
import { commentService } from "@/services/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostComment = (pageId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CommentRequest) =>
			commentService.postComment(pageId, data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: CommentQueryKeys.getComments(pageId),
			});
		},
	});
};
