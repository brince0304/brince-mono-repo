"use client";
import { convertToPostCardProps } from "@/lib/notion/convert";
import type { NotionPage } from "@/models/notion";
import { PostCard } from "@brince-mono-repo/shared-components";
import type React from "react";

interface PostListProps {
	posts: NotionPage[];
}

const PostList = ({ posts }: PostListProps) => {
	return (
		<ul className={"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"}>
			{posts
				.map((post) => convertToPostCardProps(post))
				.map((props) => (
					<PostCard key={props.slug} {...props} />
				))}
		</ul>
	);
};

export default PostList;
