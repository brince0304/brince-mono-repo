import type { Meta, StoryObj } from '@storybook/react';
import CommentSkeleton from '@/Skeleton/CommentSkeleton';

const meta: Meta<typeof CommentSkeleton> = {
  title: 'Components/Skeleton/Comment',
  component: CommentSkeleton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Comment>;

export const Default: Story = {
  args: {},
};
