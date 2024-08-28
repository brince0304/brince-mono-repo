"use client";

import usePostComment from "@/hooks/comment/usePostComment";
import { Button } from "@brince-mono-repo/shared-components";
import type React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";

interface CommentFormProps {
	pageId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ pageId }) => {
	const [author, setAuthor] = useState("");
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
		<form onSubmit={handleSubmit} className="mt-4">
			<div className="mb-4">
				<input
					type="text"
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
					className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
					placeholder="닉네임을 입력하세요"
					disabled={isPending}
					required
				/>
			</div>
			<div className="mb-4">
				<textarea
					value={text}
					onChange={(e) => setText(e.target.value)}
					className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
					placeholder="댓글 내용을 입력하세요"
					disabled={isPending}
					rows={4}
					required
				/>
			</div>
			<Button
				type="submit"
				variant={"primary"}
				size={"small"}
				className={"float-end"}
				disabled={isPending}
			>
				등록
			</Button>
		</form>
	);
};

export default CommentForm;
