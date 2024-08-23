'use client';

import { CommentQueryOptions } from '@/hooks/comment/queries';
import { Comment } from '@brince-mono-repo/shared-components';
import { SuspenseQuery } from '@suspensive/react-query';
import { Suspense } from 'react';
import {convertToCommentProps} from "@/lib/notion/convert";
import {Skeleton} from "@brince-mono-repo/shared-components";

interface CommentsProps {
  pageId: string;
}

const Comments = ({ pageId }: CommentsProps) => {
  return (
    <Suspense fallback={<Skeleton.Comment/>}>
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
