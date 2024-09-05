"use client";
import PostList from "@/components/Post/Posts/PostList";
import type { NotionPage } from "@/models/notion";
import { TextGrid } from "@brince-mono-repo/shared-components";
import { motion } from "framer-motion";
import type React from "react";

interface DailyPosts {
	posts: NotionPage[];
}

const DailyPosts = ({ posts }: DailyPosts) => {
	return (
		<motion.section
			className={"flex flex-col"}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<TextGrid title="Daily" description="일상에 관련된 얘기를 다룹니다." />
			<PostList posts={posts} />
		</motion.section>
	);
};

export default DailyPosts;
