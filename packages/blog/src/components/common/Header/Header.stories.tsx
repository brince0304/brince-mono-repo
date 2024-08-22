// biome-ignore lint/style/useImportType: <explanation>
import { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class">
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

const defaultMenuItems = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const Default: Story = {
  args: {
    menuItems: defaultMenuItems,
  },
};

export const WithCustomMenuItems: Story = {
  args: {
    menuItems: [
      { name: 'Services', path: '/services' },
      { name: 'Portfolio', path: '/portfolio' },
      { name: 'Team', path: '/team' },
    ],
  },
};

export const MobileView: Story = {
  args: {
    menuItems: defaultMenuItems,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
