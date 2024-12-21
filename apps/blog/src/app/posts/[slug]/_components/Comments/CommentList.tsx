'use client';

import { Typography } from '@repo/ui/ui/typography';
import CommentBox from './CommentBox';
import { wrap } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { CommentQueryOptions } from '@/hooks/comment';
import { UISkeleton } from '@repo/ui/UISkeleton';

interface CommentListProps {
  pageId: string;
  pageTitle: string;
}

const CommentList = wrap
  .ErrorBoundary({
    fallback: (
      <div className="flex flex-col gap-1 mt-4 justify-center items-center">
        <Typography variant={'p'}>댓글을 불러오는 중 오류가 발생했습니다 😢</Typography>
      </div>
    ),
  })
  .Suspense({ fallback: <UISkeleton.Comment /> })
  .on<CommentListProps>(({ pageId, pageTitle }) => (
    <SuspenseQuery {...CommentQueryOptions.getComments(pageId)}>
      {({ data: comments }) => {
        const commentCount = comments.length;

        return (
          <>
            {commentCount === 0 && (
              <Typography variant={'p'} className={'text-muted-foreground'}>
                첫번째 댓글을 남겨주세요 🙃
              </Typography>
            )}

            {comments.map((comment) => {
              const childComments = comments.filter(
                (c) => c.properties.ParentId.rich_text[0].text.content === comment.id
              );

              return (
                <CommentBox
                  key={comment.created_time + comment.id}
                  comment={comment}
                  childComments={childComments}
                  pageId={pageId}
                  pageTitle={pageTitle}
                />
              );
            })}
          </>
        );
      }}
    </SuspenseQuery>
  )
  );

export default CommentList;
