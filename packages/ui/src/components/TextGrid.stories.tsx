import { TextGrid } from '@/components/TextGrid';
import type { Meta, StoryObj } from '@storybook/react';
import { Home, Settings, User } from 'lucide-react';

export default {
  title: 'Components/TextGrid',
  component: TextGrid,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    Icon: {
      options: ['Home', 'Settings', 'User'],
      mapping: {
        Home: Home,
        Settings: Settings,
        User: User,
      },
      control: {
        type: 'select',
        labels: {
          Home: 'Home Icon',
          Settings: 'Settings Icon',
          User: 'User Icon',
        },
      },
    },
  },
} as Meta;
type Story = StoryObj<typeof TextGrid>;

export const Default: Story = {
  args: {
    title: 'Tech',
    description: '개발에 관련된 얘기를 다룹니다.',
    Icon: Home,
  },
};

export const TextGrids = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <TextGrid
      title="Tech"
      description="개발에 관련된 얘기를 다룹니다."
      Icon={() => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      )}
    />
    <TextGrid
      title="문화"
      description="영화, 음악, 예술에 대한 이야기를 나눕니다."
      Icon={() => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
          />
        </svg>
      )}
    />
    <TextGrid
      title="여행"
      description="세계 각지의 여행 경험을 공유합니다."
      Icon={() => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
    />
  </div>
);
