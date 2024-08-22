import type { Meta, StoryObj } from '@storybook/react';
import PostCard from './PostCard'; // 실제 경로에 맞게 수정해주세요

const meta: Meta<typeof PostCard> = {
  title: 'Components/PostCard',
  component: PostCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PostCard>;

export const 기본: Story = {
  args: {
    title: '첫 번째 블로그 포스트',
    excerpt:
      '이것은 첫 번째 블로그 포스트의 짧은 발췌문입니다. 포스트의 내용을 간략하게 소개합니다.',
    slug: 'first-blog-post',
    imageUrl: 'https://via.placeholder.com/300x200',
    tags: ['React', 'TypeScript'],
    date: '2021-09-01',
  },
};

export const 썸네일없음: Story = {
  args: {
    title: '썸네일 없는 포스트',
    excerpt: '이 포스트는 썸네일 이미지가 없는 경우를 보여줍니다.',
    slug: 'no-thumbnail-post',
    imageUrl: null,
    tags: ['React', 'TypeScript'],
    date: '2021-09-01',
  },
};

export const 긴제목: Story = {
  args: {
    title: '이것은 카드에서 여러 줄로 줄바꿈될 수 있는 매우 긴 제목의 블로그 포스트입니다',
    excerpt: '이 포스트는 긴 제목이 있는 경우 카드가 어떻게 보이는지 보여줍니다.',
    slug: 'long-title-post',
    imageUrl: 'https://via.placeholder.com/300x200',
    tags: ['React', 'TypeScript'],
    date: '2021-09-01',
  },
};

export const 짧은발췌문: Story = {
  args: {
    title: '짧은 발췌문 포스트',
    excerpt: '이것은 매우 짧은 발췌문입니다.',
    slug: 'short-excerpt-post',
    imageUrl: 'https://via.placeholder.com/300x200',
    tags: ['React', 'TypeScript'],
    date: '2021-09-01',
  },
};

export const 여러개카드: Story = {
  render: (args) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <PostCard {...args} />
      <PostCard {...args} title="두 번째 포스트" slug="second-post" />
      <PostCard {...args} title="세 번째 포스트" slug="third-post" imageUrl={null} />
    </div>
  ),
  args: {
    title: '샘플 블로그 포스트',
    excerpt: '이것은 여러 카드 레이아웃을 보여주기 위한 샘플 블로그 포스트입니다.',
    slug: 'sample-blog-post',
    imageUrl: 'https://via.placeholder.com/300x200',
    tags: ['React', 'TypeScript'],
    date: '2021-09-01',
  },
};
