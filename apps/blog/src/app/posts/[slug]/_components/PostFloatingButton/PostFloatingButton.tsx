import LikeButton from '../LikeButton/LikeButton';
import ShareButton from '../ShareButton/ShareButton';
import type React from 'react';

interface LikeAndShareProps {
  isLiked: boolean;
  pageId: string;
  count: number;
  column?: boolean;
  className?: string;
}

const PostFloatingButton: React.FC<LikeAndShareProps> = ({
  isLiked,
  pageId,
  count,
  column = false,
  className = '',
}) => {
  return (
    <div className={`flex ${column ? 'flex-col' : ''} gap-2 ${className}`}>
      <LikeButton isLiked={isLiked} pageId={pageId} count={count} />
      <ShareButton />
    </div>
  );
};

export default PostFloatingButton;
