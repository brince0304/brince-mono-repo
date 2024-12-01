'use client';

import { CommentQueryOptions } from '@/hooks/comment';
import { UISkeleton } from '@repo/ui/UISkeleton';
import { Typography } from '@repo/ui/ui/typography';
import { wrap } from '@suspensive/react';
import { SuspenseQueries } from '@suspensive/react-query';

import CommentForm from '../CommentForm/CommentForm';
import { PostQueryOptions } from '@/hooks/post';
import { StickyCommentSection } from './StickyCommentSection';
import { useEffect, useRef, useState } from 'react';
import { CommentList } from './CommentList';

interface CommentsProps {
  pageId: string;
  pageTitle: string;
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
  .on<CommentsProps>(({ pageId, pageTitle }) => (
    <SuspenseQueries
      queries={[CommentQueryOptions.getComments(pageId), PostQueryOptions.getPostLike(pageId)]}
    >
      {([{ data: comments }, { data: { likeCount, isLiked } }]) => {
        const commentSectionRef = useRef<HTMLDivElement>(null);
        const [isSticky, setIsSticky] = useState(true);

        const commentCount = comments.length;

        useEffect(() => {
          const observer = new IntersectionObserver(
            ([entry]) => {
              setIsSticky(!entry?.isIntersecting);
            },
            {
              rootMargin: '-40px',
              threshold: 0
            }
          );

          if (commentSectionRef.current) {
            observer.observe(commentSectionRef.current);
          }

          return () => observer.disconnect();
        }, []);

        return (
          <section className="flex flex-col gap-1 mt-4" data-id={'comments'} ref={commentSectionRef}>
            <div className="flex items-center mb-6">
              <Typography
                variant={'large'}
                className="border-b-2 border-gray-200 dark:border-gray-700 pb-2 w-auto font-bold"
              >
                댓글 {commentCount}개
              </Typography>
            </div>
            {/* 고정되는 댓글 섹션 */}
            {isSticky && (
              <StickyCommentSection
                commentSectionRef={commentSectionRef}
                pageId={pageId}
                commentCount={commentCount}
                likeCount={likeCount}
                isLiked={isLiked}
              />
            )}
            <CommentList comments={comments} pageId={pageId} pageTitle={pageTitle} />

            <CommentForm pageId={pageId} pageTitle={pageTitle} />
          </section>
        );
      }}
    </SuspenseQueries>
  ));

export default Comments;
