import CommentSkeletons from '@/components/Skeleton/CommentSkeletons';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CommentSkeletons> = {
  title: 'Components/Skeleton/Comment',
  component: CommentSkeletons,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Comment>;

export const Default: Story = {
  args: {},
};
