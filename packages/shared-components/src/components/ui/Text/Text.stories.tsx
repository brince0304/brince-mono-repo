import type { Meta, StoryObj } from '@storybook/react';
import Text from './Text'; // Update this import path as needed

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'p', 'blockquote', 'large', 'small', 'muted'],
    },
    children: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2',
  },
};

export const Heading3: Story = {
  args: {
    variant: 'h3',
    children: 'Heading 3',
  },
};

export const Paragraph: Story = {
  args: {
    variant: 'p',
    children:
      'This is a paragraph of text. It demonstrates the default styling for the paragraph variant.',
  },
};

export const Blockquote: Story = {
  args: {
    variant: 'blockquote',
    children:
      'This is a blockquote. Its often used for citations or pulling out important phrases.',
  },
};

export const LargeText: Story = {
  args: {
    variant: 'large',
    children: 'This is large text.',
  },
};

export const SmallText: Story = {
  args: {
    variant: 'small',
    children: 'This is small text.',
  },
};

export const MutedText: Story = {
  args: {
    variant: 'muted',
    children: 'This is muted text.',
  },
};

export const CustomClassName: Story = {
  args: {
    variant: 'p',
    children: 'This paragraph has a custom class applied.',
    className: 'text-blue-500 font-bold',
  },
};
