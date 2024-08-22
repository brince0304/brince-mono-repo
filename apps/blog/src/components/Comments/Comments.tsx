'use client';

import { CommentQueryOptions } from '@/hooks/comment/queries';
import { convertToCommentProps } from '@/lib/convert';
import { Comment } from '@brince-mono-repo/shared-components';
import { SuspenseQuery } from '@suspensive/react-query';
import { Suspense } from 'react';

interface CommentsProps {
  pageId: string;
}

const Comments = ({ pageId }: CommentsProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuspenseQuery {...CommentQueryOptions.getComments(pageId)}>
        {({ data }) => (
          <>
            {data.map((comment) => (
              <Comment key={comment.created_time} {...convertToCommentProps(comment)} />
            ))}
          </>
        )}
      </SuspenseQuery>
    </Suspense>
  );
};

export default Comments;
