import { wrap } from '@suspensive/react';
import LikeButton from '../LikeButton/LikeButton';
import ShareButton from '../ShareButton/ShareButton';
import type React from 'react';
import { SuspenseQuery } from '@suspensive/react-query';
import { PostQueryOptions } from '@/hooks/post';

interface LikeAndShareProps {
  pageId: string;
  column?: boolean;
  className?: string;
}

const PostFloatingButton: React.FC<LikeAndShareProps> = wrap.Suspense()
  .on<LikeAndShareProps>(({ pageId, column = false, className = '' }) => (
    <SuspenseQuery {...PostQueryOptions.getPostLike(pageId)}>
      {({ data: { likeCount, isLiked } }) => (
        <div className={`flex ${column ? 'flex-col' : ''} gap-2 ${className}`}>
          <LikeButton isLiked={isLiked} pageId={pageId} count={likeCount} />
          <ShareButton />
        </div>
      )}
    </SuspenseQuery>
  ));

export default PostFloatingButton;
