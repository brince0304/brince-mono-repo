'use client';

import { motion } from 'framer-motion';
import { Typography } from '@repo/ui/ui/typography';
import { ActionButtons } from './ActionButtons';

interface StickyCommentSectionProps {
  commentCount: number;
  likeCount: number;
  isLiked: boolean;
  pageId: string;
}

export function StickyCommentSection({
  commentCount,
  likeCount,
  isLiked,
  pageId,
}: StickyCommentSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky-comments fixed bottom-0 left-0 right-0 px-4 py-2 border-t border-border z-10 bg-background shadow-sm sm:hidden"
    >
      <div className="flex justify-between gap-4">
        <div className="flex items-center gap-1">
          <Typography variant={'large'} className="font-bold">
            댓글 {commentCount}개
          </Typography>
        </div>
        <ActionButtons
          pageId={pageId}
          likeCount={likeCount}
          isLiked={isLiked}
        />
      </div>
    </motion.div>
  );
} 
