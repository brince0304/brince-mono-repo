'use client';
import type React from 'react';
import { motion } from 'framer-motion';

interface LoadingProps {
  isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center"
      >
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            // biome-ignore lint/style/useNumberNamespace: <explanation>
            repeat: Infinity,
            ease: 'linear',
          }}
          className="w-5 h-5 border-t-4 border-gray-500 border-solid rounded-full mb-4"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-gray-800 dark:text-gray-200 font-medium"
        >
          불러오고 있어요
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Loading;
