"use client";
import PostList from "@/components/Posts/PostList";
import type { NotionPage } from "@/models/notion";
import { TextGrid } from "@brince-mono-repo/shared-components";
import type React from "react";

interface TechPostsProps {
	posts: NotionPage[];
}

const TechPosts: React.FC<TechPostsProps> = ({ posts }) => {
	return (
		<section className={"flex flex-col"}>
			<TextGrid
				title="Tech"
				description="개발에 관련된 얘기를 다룹니다."
				Icon={() => (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
						/>
					</svg>
				)}
			/>
			<PostList posts={posts} />
		</section>
	);
};

export default TechPosts;
