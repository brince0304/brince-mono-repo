'use client';

import { Typography } from '@repo/ui/ui/typography';
import CommentBox from './CommentBox';
import type { NotionPage } from '@/models/notion';

interface CommentListProps {
  comments: NotionPage[];
  pageId: string;
  pageTitle: string;
}

export function CommentList({ comments, pageId, pageTitle }: CommentListProps) {
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
} 
