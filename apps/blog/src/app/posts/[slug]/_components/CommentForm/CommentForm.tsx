'use client';

import { usePostComment } from '@/hooks/comment/useCommentService';
import { Avatar, AvatarImage } from '@repo/ui/ui/avatar';
import { Button } from '@repo/ui/ui/button';
import { Textarea } from '@repo/ui/ui/textarea';
import { Typography } from '@repo/ui/ui/typography';
import type React from 'react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

interface CommentFormProps {
  pageId: string;
  parentId?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ pageId, parentId }) => {
  const [text, setText] = useState('');
  const { mutateAsync: postComment, isPending, reset } = usePostComment({ pageId, parentId });

  const avatarUrl = useMemo(() => {
    const styles = ['adventurer', 'avataaars', 'bottts', 'personas'];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    const randomSeed = Math.random().toString(36).substring(7);
    return `https://api.dicebear.com/6.x/${randomStyle}/svg?seed=${randomSeed}`;
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim()) {
      return;
    }

    const isReply = Boolean(parentId);
    const messages = {
      loading: isReply ? '답글을 등록 중입니다 🚀' : '댓글을 등록 중입니다 🚀',
      success: isReply ? '답글이 등록되었습니다 🎉' : '댓글이 등록되었습니다 🎉',
      error: '댓글 등록에 실패하였습니다 😢',
    };

    toast.promise(postComment({ author: '익명', text }), {
      loading: messages.loading,
      success: () => {
        reset();
        setText('');
        return messages.success;
      },
      error: messages.error,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="댓글 등록">
      <div className="flex items-start space-x-4">
        {!parentId && (
          <Avatar className="w-10 h-10">
            <AvatarImage src={avatarUrl} />
          </Avatar>
        )}

        <div className="flex-grow space-y-2">
          {!parentId && (
            <Typography variant={'small'} className={'font-semibold'}>
              익명
            </Typography>
          )}

          <Textarea
            required
            disabled={isPending}
            placeholder={parentId ? '답글을 남겨주세요 👋🏻' : '댓글은 큰 도움이 됩니다 🙏'}
            onChange={(e) => setText(e.target.value)}
            value={text}
          />

          <div className="flex justify-end">
            <Button disabled={isPending} type={'submit'} variant={'outline'} size={'sm'}>
              {parentId ? '답글 등록' : '등록'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
