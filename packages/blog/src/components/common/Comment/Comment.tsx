'use client';

import Avatar from '@/components/common/Avatar/Avatar';
import Button from '@/components/common/Button/Button';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import type React from 'react';
import Text from '../Text/Text';

export interface CommentProps {
  author: string;
  content: string;
  createdAt: string;
  liked?: boolean;
  owner?: boolean;
}

const Comment: React.FC<CommentProps> = ({ author, content, createdAt, liked, owner }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 shadow-md transition-colors duration-200">
      <div className="flex items-center mb-2">
        <Avatar size={32} className={'mr-2'} owner={owner} />
        <div>
          <Text variant="emphasis">{owner ? '주인장' : author}</Text>
          <Text variant="body-small" className="text-gray-500 dark:text-gray-400">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: ko })}
          </Text>
        </div>
      </div>
      <Text variant="body" className="mb-3">
        {content}
      </Text>
      <div className="flex items-center">
        {liked && <Avatar size={32} className={'mr-2'} liked owner />}
        <Button variant={'transparent'} size={'small'}>
          <Text variant="body-small">답글</Text>
        </Button>
      </div>
    </div>
  );
};

export default Comment;
