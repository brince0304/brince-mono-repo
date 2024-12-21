'use client';

import { CommentQueryOptions } from '@/hooks/comment';
import { Typography } from '@repo/ui/ui/typography';
import CommentForm from '../CommentForm/CommentForm';
import { useQuery } from '@tanstack/react-query';
import CommentList from './CommentList';

interface CommentsProps {
  pageId: string;
  pageTitle: string;
}

const Comments = (({ pageId, pageTitle }: CommentsProps) => {
  const { data: comments } = useQuery(CommentQueryOptions.getComments(pageId))

  return (
    <section className="flex flex-col gap-4 mt-4" data-id={'comments'}>
      <div className="flex items-center">
        <Typography
          variant={'large'}
          className="pb-2 w-auto font-bold"
        >
          댓글 {`${comments?.length ?? ''}개`}
        </Typography>
      </div>
      <CommentForm pageId={pageId} pageTitle={pageTitle} />
      <div className="border-t pt-4 mt-4" />
      <CommentList pageId={pageId} pageTitle={pageTitle} />
    </section>
  );
});

export default Comments;
