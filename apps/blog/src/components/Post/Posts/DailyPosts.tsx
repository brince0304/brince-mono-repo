import PostList from "@/components/Post/Posts/PostList";
import type { NotionPage } from "@/models/notion";
import { TextGrid } from "@brince-mono-repo/shared-components";
import type React from "react";

interface DailyPosts {
	posts: NotionPage[];
}

const DailyPosts = ({ posts }: DailyPosts) => {
	return (
		<section className={"flex flex-col"}>
			<TextGrid title="Daily" description="일상에 관련된 얘기를 다룹니다." />
			<PostList posts={posts} />
		</section>
	);
};

export default DailyPosts;
