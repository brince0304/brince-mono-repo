'use client';
import CommentForm from '../CommentForm/CommentForm';
import CommentList from './CommentList';

interface CommentsProps {
  pageId: string;
  pageTitle: string;
}

const Comments = ({ pageId, pageTitle }: CommentsProps) => {
  return (
    <section className="flex flex-col gap-4 mt-4" data-id={'comments'}>
      <CommentForm pageId={pageId} pageTitle={pageTitle} />
      <div className="border-t pt-4 mt-4" />
      <CommentList pageId={pageId} pageTitle={pageTitle} />
    </section>
  );
};

export default Comments;
