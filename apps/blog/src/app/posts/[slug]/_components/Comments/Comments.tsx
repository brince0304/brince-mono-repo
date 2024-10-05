'use client';

import { CommentQueryOptions } from '@/hooks/comment';
import { UISkeleton } from '@repo/ui/UISkeleton';
import { Typography } from '@repo/ui/ui/typography';
import { wrap } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';
import CommentBox from './CommentBox';

interface CommentsProps {
  pageId: string;
}

const Comments = wrap
  .ErrorBoundary({
    fallback: (
      <div className="flex flex-col gap-1 mt-4 justify-center items-center">
        <Typography variant={'p'}>댓글을 불러오는 중 오류가 발생했습니다 😢</Typography>
      </div>
    ),
  })
  .Suspense({ fallback: <UISkeleton.Comment /> })
  .on<CommentsProps>(({ pageId }) => (
    <SuspenseQuery {...CommentQueryOptions.getComments(pageId)}>
      {({ data }) => {
        const commentCount = data.length;

        return (
          <section className="flex flex-col gap-1 mt-4" data-id={'comments'}>
            <div className="flex items-center mb-6">
              <Typography
                variant={'h3'}
                className="border-b-2 border-gray-200 dark:border-gray-700 pb-2 w-auto font-bold"
              >
                댓글 {commentCount}개
              </Typography>
            </div>

            {commentCount === 0 && (
              <Typography variant={'p'} className={'text-muted-foreground'}>
                첫번째 댓글을 남겨주세요 🙃
              </Typography>
            )}

            {data.map((comment) => {
              const childComments = data.filter(
                (c) => c.properties.ParentId.rich_text[0].text.content === comment.id
              );

              return (
                <CommentBox
                  key={comment.created_time + comment.id}
                  comment={comment}
                  childComments={childComments}
                  pageId={pageId}
                />
              );
            })}
          </section>
        );
      }}
    </SuspenseQuery>
  ));

export default Comments;
