import { motion } from 'framer-motion';
import { Avatar, AvatarImage } from '@repo/ui/ui/avatar';
import { RefreshCwIcon } from 'lucide-react';
import { getAvatarUrl } from '../Comments/Comment.util';
import { memo, useState } from 'react';
import { useThrottle } from '@toss/react';

interface CommentAvatarProps {
  handleAvatarChange: (setIsLoading: (isLoading: boolean) => void) => () => void;
  currentAvatar: string | null;
}

const CommentAvatar = memo(({ handleAvatarChange, currentAvatar }: CommentAvatarProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const throttledHandleAvatarChange = useThrottle(handleAvatarChange(setIsLoading), 1500);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Avatar className="cursor-pointer group relative" onClick={throttledHandleAvatarChange}>
        <motion.div
          className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 rounded-full"
          animate={{
            scale: isLoading ? 0.8 : 1,
            opacity: isLoading ? 0.5 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <RefreshCwIcon className={`w-4 h-4 text-white ${isLoading ? 'animate-spin' : ''}`} />
        </div>
        <motion.div
          animate={{
            scale: isLoading ? 0.8 : 1,
            opacity: isLoading ? 0.5 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <AvatarImage src={currentAvatar || getAvatarUrl()} alt="댓글 아바타" />
        </motion.div>
      </Avatar>
    </motion.div>
  );
});

export default CommentAvatar;
