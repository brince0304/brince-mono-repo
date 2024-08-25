import { CommentQueryKeys } from "@/hooks/comment/queries";
import type { CommentRequest } from "@/models/notion";
import { commentService } from "@/services/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const usePostComment = (pageId: string) => {
	const toastId = "comment-posted";
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CommentRequest) =>
			commentService.postComment(pageId, data),
		onMutate: () => {
			toast("댓글을 등록하고 있어요 🚀", {
				toastId,
				progress: undefined,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: CommentQueryKeys.getComments(pageId),
			});
			toast.update(toastId, {
				render: "댓글이 등록되었어요 🎉",
				type: "success",
				autoClose: 1000,
			});
		},
	});
};

export default usePostComment;
