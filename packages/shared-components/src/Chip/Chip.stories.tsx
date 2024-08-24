import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Chip from '@/Chip/Chip';
import { Tag } from 'lucide-react';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  argTypes: {
    text: { control: 'text' },
    color: {
      control: {
        type: 'select',
        options: [
          'blue',
          'green',
          'red',
          'yellow',
          'purple',
          'gray',
          'slate',
          'zinc',
          'neutral',
          'stone',
        ],
      },
    },
    onClick: { action: 'clicked' },
    hoverEffect: { control: 'boolean' },
    tag: { control: 'boolean' },
    shape: { control: { type: 'select', options: ['rounded', 'square'] } },
  },
} as Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    text: 'Default Tag',
    color: 'blue',
    hoverEffect: true,
  },
};

export const WithoutHoverEffect: Story = {
  args: {
    text: 'No Hover Effect',
    color: 'green',
    hoverEffect: false,
  },
};

export const Clickable: Story = {
  args: {
    text: 'Clickable Tag',
    color: 'purple',
    hoverEffect: true,
    onClick: () => alert('Tag clicked!'),
  },
};

export const Shapes = () => (
  <div className="flex flex-wrap gap-2">
    <Chip text="Rounded" color="blue" shape="rounded" />
    <Chip text="Square" color="green" shape="square" />
  </div>
);

export const AllColors = () => (
  <div className="flex flex-wrap gap-2">
    {['blue', 'green', 'red', 'yellow', 'purple', 'gray', 'slate', 'zinc', 'neutral', 'stone'].map(
      (color) => (
        // @ts-ignore
        <Chip key={color} text={color} color={color} />
      )
    )}
  </div>
);

export const WithIcon = () => <Chip text="With Icon" icon={<Tag className="w-4 h-4 mr-1.5" />} />;

export const WithTag = () => <Chip text="With Tag" tag={true} />;
