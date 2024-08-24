"use client";

import usePostComment from "@/hooks/comment/usePostComment";
import { Button } from "@brince-mono-repo/shared-components";
import type React from "react";
import { useState } from "react";

interface CommentFormProps {
	pageId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ pageId }) => {
	const [author, setAuthor] = useState("");
	const [text, setText] = useState("");

	const { mutate: postComment } = usePostComment(pageId);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (author.trim() && text.trim()) {
			postComment({ author, text });
			setAuthor("");
			setText("");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="mt-4">
			<div className="mb-4">
				<input
					type="text"
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
					className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
					placeholder="닉네임을 입력하세요"
					required
				/>
			</div>
			<div className="mb-4">
				<textarea
					value={text}
					onChange={(e) => setText(e.target.value)}
					className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
					placeholder="댓글 내용을 입력하세요"
					rows={4}
					required
				/>
			</div>
			<Button
				type="submit"
				variant={"primary"}
				size={"small"}
				className={"float-end"}
			>
				등록
			</Button>
		</form>
	);
};

export default CommentForm;
