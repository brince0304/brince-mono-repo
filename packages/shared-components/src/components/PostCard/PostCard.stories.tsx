import type { Meta, StoryObj } from "@storybook/react";
import Link from "next/link";
import PostCard from "./PostCard";

const meta: Meta<typeof PostCard> = {
	title: "Components/PostCard",
	component: PostCard,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PostCard>;

const DefaultArgs = {
	title: "Getting Started with React",
	excerpt:
		"Learn the basics of React and start building awesome user interfaces.",
	slug: "getting-started-with-react",
	date: "2023-08-15",
	tags: ["React", "JavaScript", "Frontend"],
	likes: 42,
	comments: 10,
};

export const Default: Story = {
	args: {
		...DefaultArgs,
		imageUrl:
			"https://velog.velcdn.com/images/brince/post/b2dc424c-162b-4bbc-b368-10bfab026939/image.png",
	},
};

export const NoImage: Story = {
	args: {
		...DefaultArgs,
		imageUrl: undefined,
	},
};

export const LongTitle: Story = {
	args: {
		...DefaultArgs,
		title:
			"This is a very long title that might wrap to multiple lines and test the layout",
		imageUrl: "https://source.unsplash.com/random/800x600?coding",
	},
};

export const ManyTags: Story = {
	args: {
		...DefaultArgs,
		tags: [
			"React",
			"JavaScript",
			"Frontend",
			"Web Development",
			"Programming",
			"UI/UX",
		],
		imageUrl: "https://source.unsplash.com/random/800x600?programming",
	},
};

export const NoLikes: Story = {
	args: {
		...DefaultArgs,
		likes: undefined,
		imageUrl: "https://source.unsplash.com/random/800x600?computer",
	},
};

export const ManyLikesAndComments: Story = {
	args: {
		...DefaultArgs,
		likes: 9999,
		comments: 999,
		imageUrl: "https://source.unsplash.com/random/800x600?technology",
	},
};
