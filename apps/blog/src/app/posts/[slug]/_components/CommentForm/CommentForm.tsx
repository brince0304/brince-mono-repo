'use client';

import { usePostComment } from '@/hooks/comment/useCommentService';
import { Button } from '@repo/ui/ui/button';
import { Textarea } from '@repo/ui/ui/textarea';
import { Typography } from '@repo/ui/ui/typography';
import { useState, useCallback, memo } from 'react';
import { toast } from 'sonner';
import { getAvatarUrl } from '../Comments/Comment.util';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormField } from '@repo/ui/ui/form';
import CommentAvatar from './CommentAvatar';
import { Input } from '@repo/ui/ui/input';
import { COMMENT_SUBMIT_MESSAGES } from './CommentForm.consts';
import { cn } from '@/lib/utils';
import { commentFormSchema } from './CommentForm.consts';
import type { InferZodType } from '@/lib/types';
import type { CommentRequestParameters } from '@/models/notion';

const CommentForm = memo(({ pageTitle, pageId, parentId }: Omit<CommentRequestParameters, 'data'>) => {
  const form = useForm<InferZodType<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      text: '',
      author: '',
    },
  });
  const { formState: { errors }, handleSubmit } = form;

  const { mutateAsync: postComment, isPending } = usePostComment({ pageId, parentId, pageTitle });
  const [currentAvatar, setCurrentAvatar] = useState<string>(getAvatarUrl());

  const errorMessage = errors.text?.message || errors.author?.message;

  const handleAvatarChange = useCallback((setIsLoading: (isLoading: boolean) => void) => () => {
    const newAvatarUrl = getAvatarUrl();
    setIsLoading(true);

    const img = new Image();
    img.src = newAvatarUrl;
    img.onload = () => {
      setCurrentAvatar(newAvatarUrl);
      setIsLoading(false);
    };
  }, []);

  const handleSubmitForm = async (data: InferZodType<typeof commentFormSchema>) => {
    const isReply = Boolean(parentId);
    const messages = isReply ? COMMENT_SUBMIT_MESSAGES.REPLY : COMMENT_SUBMIT_MESSAGES.COMMENT;

    toast.promise(
      postComment({ ...data, avatar: currentAvatar }),
      {
        loading: messages.loading,
        success: () => {
          form.reset();
          setCurrentAvatar(getAvatarUrl());
          return messages.success;
        },
        error: COMMENT_SUBMIT_MESSAGES.error,
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4 border-t pt-4" aria-label="댓글 등록">
        <div className="flex items-start space-x-4">
          <CommentAvatar handleAvatarChange={handleAvatarChange} currentAvatar={currentAvatar} />
          <div className="flex-grow space-y-2">
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <Input placeholder="익명" className='w-[100px]' {...field} />
              )}
            />
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <Textarea
                  required
                  disabled={isPending}
                  placeholder={parentId ? '답글을 남겨주세요 👋🏻' : '댓글은 큰 도움이 됩니다 🙏'}
                  {...field}
                />
              )}
            />
            <div className="flex justify-between">
              <Typography variant={'muted'} className={cn(errorMessage && 'text-red-400')}>
                {errorMessage || '아바타를 클릭해서 변경해보세요 💡'}
              </Typography>
              <Button disabled={isPending} type={'submit'} variant={'outline'} size={'sm'}>
                {parentId ? '답글 등록' : '등록'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
});

export default CommentForm;
