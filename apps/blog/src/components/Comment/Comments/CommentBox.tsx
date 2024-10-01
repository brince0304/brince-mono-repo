import { convertToCommentProps } from '@/lib/notion/convert';
import type { NotionPage } from '@/models/notion';
import { Comment } from '@repo/ui/Comment';
import { useState } from 'react';
import CommentForm from '../CommentForm/CommentForm';
import { motion } from 'framer-motion';
import React from 'react';

interface CommentBoxProps {
  comment: NotionPage;
  childComments: NotionPage[];
  pageId: string;
}

const CommentBox = ({ comment, childComments, pageId }: CommentBoxProps) => {
  const parentId = comment.properties.ParentId.rich_text[0].text.content;

  if (parentId !== '') {
    return null;
  }

  const [isClickedReply, setIsClickedReply] = useState(false);

  const toggleReply = () => setIsClickedReply((prev) => !prev);

  const renderChildComments = () =>
    childComments.map((childComment) => (
      <div key={childComment.id} className="flex flex-col pl-8">
        <Comment {...convertToCommentProps(childComment)} isReply />
      </div>
    ));

  return (
    <div className="flex flex-col">
      <Comment
        {...convertToCommentProps(comment)}
        onClick={toggleReply}
        childCommentLength={childComments.length}
      />

      <div className="flex flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isClickedReply ? 1 : 0,
            height: isClickedReply ? 'auto' : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {renderChildComments()}

          <motion.div
            className="pl-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CommentForm parentId={comment.id} pageId={pageId} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommentBox;
