import CommentSkeleton from "@/components/Skeleton/CommentSkeleton";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CommentSkeleton> = {
	title: "Components/Skeleton/Comment",
	component: CommentSkeleton,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Comment>;

export const Default: Story = {
	args: {},
};
