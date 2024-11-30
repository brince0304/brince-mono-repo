import { convertToCommentProps } from './Comment.util';
import type { NotionPage } from '@/models/notion';
import { Comment } from '@/app/posts/[slug]/_components/Comments/Comment';
import { useState } from 'react';
import CommentForm from '../CommentForm/CommentForm';
import { motion } from 'framer-motion';
import type React from 'react';

interface CommentBoxProps {
  comment: NotionPage;
  childComments: NotionPage[];
  pageId: string;
  pageTitle: string;
}

const CommentBox: React.FC<CommentBoxProps> = ({ comment, childComments, pageId, pageTitle }) => {
  const parentId = comment.properties.ParentId.rich_text[0].text.content;

  if (parentId !== '') {
    return null;
  }

  const [isClickedReply, setIsClickedReply] = useState(false);

  const handleTransition = () => {
    setIsClickedReply((prev) => !prev);
  };

  return (
    <div className="flex flex-col">
      <Comment
        {...convertToCommentProps(comment)}
        onClickReply={handleTransition}
        childCommentLength={childComments.length}
      />

      <div className="flex flex-col gap-4">
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isClickedReply ? 'auto' : 0, opacity: isClickedReply ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="pl-8"
          style={{ overflow: 'hidden' }}
        >
          {childComments.map((childComment) => (
            <div key={childComment.id} className="flex flex-col">
              <Comment {...convertToCommentProps(childComment)} isReply />
            </div>
          ))}

          <CommentForm parentId={comment.id} pageId={pageId} pageTitle={pageTitle} />
        </motion.div>
      </div>
    </div>
  );
};

export default CommentBox;
