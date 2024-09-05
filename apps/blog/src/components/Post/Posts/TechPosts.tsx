import PostList from "@/components/Post/Posts/PostList";
import type { NotionPage } from "@/models/notion";
import { TextGrid } from "@brince-mono-repo/shared-components";
import type React from "react";

interface TechPostsProps {
	posts: NotionPage[];
}

const TechPosts: React.FC<TechPostsProps> = ({ posts }) => {
	return (
		<section className={"flex flex-col"}>
			<TextGrid title="Tech" description="개발에 관련된 얘기를 다룹니다." />
			<PostList posts={posts} />
		</section>
	);
};

export default TechPosts;
