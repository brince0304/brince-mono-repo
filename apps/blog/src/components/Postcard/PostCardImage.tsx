'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const PostCardImage = ({ imageUrl, title }: { imageUrl: string; title: string }) => {
  const wrapperClass = "flex-shrink-0 w-20 h-20 sm:w-32 sm:h-32 overflow-hidden rounded-md";

  const imageProps = {
    src: imageUrl,
    alt: `${title}의 대표 이미지`,
    width: 128,
    height: 128,
    loading: "lazy" as const,
    className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
  };

  return (
    <div className="relative">
      <noscript>
        <div className={`${wrapperClass} absolute inset-0`}>
          <Image {...imageProps} />
        </div>
      </noscript>

      <motion.div
        className={wrapperClass}
        initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.3 }}
      >
        <Image {...imageProps} />
      </motion.div>
    </div>
  );
};

export { PostCardImage };
