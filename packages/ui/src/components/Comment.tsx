'use client';

import { HeartFilledIcon } from '@radix-ui/react-icons';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import type React from 'react';
import { useMemo } from 'react';
import { BrinceAvatar } from './BrinceAvatar';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { getAvatarUrl } from '../lib/utils';

export interface CommentProps {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  liked?: boolean;
  owner?: boolean;
  isReply?: boolean;
  onClick?: () => void;
  childCommentLength?: number;
}

const Comment: React.FC<CommentProps> = ({
  author,
  content,
  createdAt,
  liked,
  owner,
  isReply,
  onClick,
  childCommentLength,
}) => {
  const memoizedAvatar = useMemo(() => {
    return owner ? (
      <BrinceAvatar />
    ) : (
      <Avatar>
        <AvatarImage src={getAvatarUrl()} />
        <AvatarFallback>{author[0]}</AvatarFallback>
      </Avatar>
    );
  }, [author, owner]);

  return (
    <div className="w-full mb-6">
      <div className="flex items-start space-x-4 mb-2">
        {memoizedAvatar}
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm font-semibold">{owner ? '브린스' : author}</span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(createdAt), {
                addSuffix: true,
                locale: ko,
              })}
            </span>
          </div>
          <Card className="p-4">
            <p className="text-sm">{content}</p>
          </Card>
          <div className="flex items-center gap-4 mt-2">
            {liked && (
              <div className="relative inline-block">
                <BrinceAvatar className="w-7 h-7" />
                <div className="absolute top-4 left-5 p-0.5">
                  <HeartFilledIcon />
                </div>
              </div>
            )}
            {!isReply && (
              <Button variant="ghost" size="sm" onClick={onClick}>
                답글 {childCommentLength}개
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Comment };
