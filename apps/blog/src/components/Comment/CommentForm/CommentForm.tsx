"use client";

import usePostComment from "@/hooks/comment/usePostComment";
import {
	Avatar,
	Button,
	Text,
	Textarea,
} from "@brince-mono-repo/shared-components";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import type React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";

interface CommentFormProps {
	pageId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ pageId }) => {
	const [author, setAuthor] = useState("익명");
	const [text, setText] = useState("");

	const {
		mutateAsync: postComment,
		isPending,
		isSuccess,
	} = usePostComment(pageId);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (author.trim() && text.trim()) {
			toast.promise(postComment({ author, text }), {
				loading: "댓글을 등록 중입니다 🚀",
				success: "댓글이 등록되었습니다 🎉",
				error: "댓글 등록에 실패하였습니다 😢",
			});
		}
	};

	useEffect(() => {
		if (isSuccess) {
			setAuthor("");
			setText("");
		}
	}, [isSuccess]);

	return (
		<form onSubmit={handleSubmit} className="space-y-4" aria-label="댓글 등록">
			<div className="flex items-start space-x-4">
				<Avatar className="w-10 h-10">
					<img src="/api/placeholder/40/40" alt="User avatar" />
				</Avatar>
				<div className="flex-grow space-y-2">
					<Text variant={"small"} className={"font-semibold"}>
						익명
					</Text>
					<Textarea
						required
						disabled={isPending}
						placeholder="댓글은 큰 도움이 됩니다 🙏"
						onChange={(e) => setText(e.target.value)}
						value={text}
					/>
					<div className="flex justify-end">
						<Button
							disabled={isPending}
							type={"submit"}
							variant={"outline"}
							size={"sm"}
						>
							등록
						</Button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default CommentForm;
