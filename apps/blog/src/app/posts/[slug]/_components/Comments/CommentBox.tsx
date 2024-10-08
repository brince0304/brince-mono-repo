import { convertToCommentProps } from '@/lib/notion/convert';
import type { NotionPage } from '@/models/notion';
import { Comment } from '@repo/ui/Comment';
import { useState } from 'react';
import CommentForm from '../CommentForm/CommentForm';
import { motion } from 'framer-motion';
import type React from 'react';

interface CommentBoxProps {
  comment: NotionPage;
  childComments: NotionPage[];
  pageId: string;
}

const CommentBox: React.FC<CommentBoxProps> = ({ comment, childComments, pageId }) => {
  const parentId = comment.properties.ParentId.rich_text[0].text.content;

  if (parentId !== '') {
    return null;
  }

  const [isClickedReply, setIsClickedReply] = useState(false);

  const renderChildComments = () =>
    childComments.map((childComment) => (
      <div key={childComment.id} className="flex flex-col pl-8">
        <Comment {...convertToCommentProps(childComment)} isReply />
      </div>
    ));

  const handleTransition = () => {
    setIsClickedReply((prev) => !prev);
  };

  return (
    <div className="flex flex-col">
      <Comment
        {...convertToCommentProps(comment)}
        onClick={handleTransition}
        childCommentLength={childComments.length}
      />

      <div className="flex flex-col gap-4">
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isClickedReply ? 'auto' : 0, opacity: isClickedReply ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ overflow: 'hidden' }}
        >
          {renderChildComments()}

          <div className="pl-8">
            <CommentForm parentId={comment.id} pageId={pageId} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommentBox;
