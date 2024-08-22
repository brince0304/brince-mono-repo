import Avatar from '@/components/common/Avatar/Avatar';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],

  argTypes: {
    owner: { control: 'boolean' },
    liked: { control: 'boolean' },
    size: { control: 'number' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    owner: false,
    liked: false,
    size: 40,
  },
};
