import { CommentQueryOptions } from '@/hooks/comment';
import { PostQueryOptions } from '@/hooks/post';
import { Typography } from '@repo/ui/ui/typography';
import { useQueries } from '@tanstack/react-query';
import { HeartIcon, MessageCircleIcon } from 'lucide-react';

const PostLikeCommentsInfo = ({ pageId }: { pageId: string }) => {
  const [{ data: postLike }, { data: comments }] = useQueries({
    queries: [PostQueryOptions.getPostLike(pageId), CommentQueryOptions.getComments(pageId)],
  });

  return (
    <div className="flex gap-2">
      <div className="flex gap-1 items-center">
        <HeartIcon className="w-4 h-4 text-white" />
        <Typography variant="p" className="text-white font-bold">
          {postLike?.likeCount ?? 0}
        </Typography>
      </div>
      <div className="flex gap-1 items-center">
        <MessageCircleIcon className="w-4 h-4 text-white" />
        <Typography variant="p" className="text-white font-bold">
          {comments?.length ?? 0}
        </Typography>
      </div>
    </div>
  );
};

export default PostLikeCommentsInfo;
