import type { Meta, StoryObj } from '@storybook/react';
import Comment from './Comment';

const meta: Meta<typeof Comment> = {
  title: 'Components/Comment',
  component: Comment,
  tags: ['autodocs'],
  argTypes: {
    author: { control: 'text' },
    content: { control: 'text' },
    createdAt: { control: 'date' },
    liked: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Comment>;

export const Default: Story = {
  args: {
    author: '김철수',
    content: '정말 좋은 글이네요. 많은 도움이 되었습니다!',
    createdAt: new Date('2024-03-15T09:00:00').toISOString(),
    liked: true,
  },
};

export const LongComment: Story = {
  args: {
    ...Default.args,
    content:
      '이 글은 정말 깊이 있는 내용을 다루고 있어서 매우 인상적이었습니다. 특히 세 번째 단락에서 언급된 개념은 제가 평소에 고민하던 문제에 대한 새로운 시각을 제시해 주었습니다. 앞으로도 이런 양질의 컨텐츠를 계속 볼 수 있었으면 좋겠습니다. 작성자님의 다음 글이 기대됩니다!',
  },
};

export const RecentComment: Story = {
  args: {
    ...Default.args,
    createdAt: new Date().toISOString(),
  },
};

export const DarkMode: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
