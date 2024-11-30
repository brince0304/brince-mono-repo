'use client';

import { HeartFilledIcon } from '@radix-ui/react-icons';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import type React from 'react';
import { useMemo } from 'react';
import { BrinceAvatar } from '@repo/ui/components/BrinceAvatar';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/ui/avatar';
import { Button } from '@repo/ui/components/ui/button';
import { Card } from '@repo/ui/components/ui/card';
import { getAvatarUrl } from './Comment.util';

export interface CommentProps {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  liked?: boolean;
  owner?: boolean;
  isReply?: boolean;
  avatar?: string;
  onClickReply?: () => void;
  childCommentLength?: number;
}

const Comment: React.FC<CommentProps> = ({
  author,
  content,
  createdAt,
  liked,
  owner,
  isReply,
  avatar,
  onClickReply,
  childCommentLength,
}) => {
  const memoizedAvatarUrl = useMemo(() => avatar || getAvatarUrl(), [avatar]);

  const memoizedAvatar = useMemo(() => {
    return owner ? (
      <BrinceAvatar />
    ) : (
      <Avatar>
        <AvatarImage src={memoizedAvatarUrl} alt="댓글 아바타" />
        <AvatarFallback>{author[0]}</AvatarFallback>
      </Avatar>
    );
  }, [author, owner, memoizedAvatarUrl]);

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
              <Button variant="ghost" size="sm" onClick={onClickReply}>
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
