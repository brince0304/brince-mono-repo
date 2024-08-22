import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import LinkButton from './LinkButton';

const meta: Meta<typeof LinkButton> = {
  title: 'Components/LinkButton',
  component: LinkButton,
  tags: ['autodocs'],
  argTypes: {
    href: { control: 'text' },
    isActive: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof LinkButton>;

export const Default: Story = {
  args: {
    children: 'Click me',
    href: '#',
  },
};

export const Active: Story = {
  args: {
    children: 'Active Link',
    href: '#',
    isActive: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    href: '#',
    fullWidth: true,
  },
};

export const AsButton: Story = {
  args: {
    children: 'Button',
    onClick: () => alert('Button clicked!'),
  },
};

export const CustomClassName: Story = {
  args: {
    children: 'Custom Style',
    href: '#',
    className: 'bg-purple-500 text-white hover:bg-purple-600',
  },
};
