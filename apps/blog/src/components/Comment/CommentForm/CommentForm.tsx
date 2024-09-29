'use client';

import { usePostComment } from '@/hooks/comment/useCommentService';
import { Avatar, AvatarImage } from '@repo/ui/ui/avatar';
import { Button } from '@repo/ui/ui/button';
import { Textarea } from '@repo/ui/ui/textarea';
import { Typography } from '@repo/ui/ui/typography';
import type React from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { toast } from 'sonner';

interface CommentFormProps {
  pageId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ pageId }) => {
  const getAvatarUrl = () => {
    const styles = ['adventurer', 'avataaars', 'bottts', 'personas'];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    const randomSeed = Math.random().toString(36).substring(7);
    return `https://api.dicebear.com/6.x/${randomStyle}/svg?seed=${randomSeed}`;
  };

  const [text, setText] = useState('');

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const avatarUrl = useMemo(() => getAvatarUrl(), []);

  const { mutateAsync: postComment, isPending, reset } = usePostComment(pageId);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text.trim()) {
      toast.promise(postComment({ author: '익명', text }), {
        loading: '댓글을 등록 중입 니다 🚀',
        success: () => {
          reset();
          setText('');
          return '댓글이 등록되었습니다 🎉';
        },
        error: '댓글 등록에 실패하였습니다 😢',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="댓글 등록">
      <div className="flex items-start space-x-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={avatarUrl} />
        </Avatar>
        <div className="flex-grow space-y-2">
          <Typography variant={'small'} className={'font-semibold'}>
            익명
          </Typography>
          <Textarea
            required
            disabled={isPending}
            placeholder="댓글은 큰 도움이 됩니다 🙏"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <div className="flex justify-end">
            <Button disabled={isPending} type={'submit'} variant={'outline'} size={'sm'}>
              등록
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
