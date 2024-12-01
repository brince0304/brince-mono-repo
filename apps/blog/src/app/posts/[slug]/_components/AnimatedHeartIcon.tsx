import { motion } from 'framer-motion';
import { HeartIcon } from 'lucide-react';

const AnimatedHeartIcon = () => {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 0.95, 1.02, 1],
        rotate: [-2, 4, -3, 2, -1],
        y: [0, -2, 1, -1, 0]
      }}
      transition={{
        duration: 0.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 3,
        ease: "easeInOut"
      }}
    >
      <HeartIcon className="w-4 h-4" />
    </motion.div>
  );
};

export default AnimatedHeartIcon;
