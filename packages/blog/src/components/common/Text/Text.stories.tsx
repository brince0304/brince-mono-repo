import type { Meta, StoryObj } from '@storybook/react';
import Text from './Text';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'body', 'body-large', 'body-small', 'emphasis'],
    },
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

export const BodyText: Story = {
  args: {
    variant: 'body',
    children: 'This is regular body text.',
  },
};

export const BodyLarge: Story = {
  args: {
    variant: 'body-large',
    children: 'This is large body text.',
  },
};

export const BodySmall: Story = {
  args: {
    variant: 'body-small',
    children: 'This is small body text.',
  },
};

export const Emphasis: Story = {
  args: {
    variant: 'emphasis',
    children: 'This text is emphasized.',
  },
};
