import LikeButton from '../LikeButton/LikeButton';
import ShareButton from '../ShareButton/ShareButton';

interface LikeAndShareProps {
  pageId: string;
  column?: boolean;
  className?: string;
}

const PostFloatingButton = ({ pageId, column = false, className = '' }: LikeAndShareProps) => (
  <div className={`flex ${column ? 'flex-col' : ''} gap-2 ${className}`}>
    <LikeButton pageId={pageId} />
    <ShareButton />
  </div>
);

export default PostFloatingButton;
