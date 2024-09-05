import PostSkeleton from '@/components/Skeleton/PostSkeleton';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PostSkeleton> = {
  title: 'Components/Skeleton/Post',
  component: PostSkeleton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PostSkeleton>;

export const Default: Story = {
  args: {},
};
