'use client';

import { Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { TagBadge } from './TagBadge';
import { Typography } from './ui/typography';
import { motion } from 'framer-motion';
export interface PostCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  tags: string[];
  likes?: number;
  imageUrl?: string;
  comments: number;
  priority?: boolean;
}

const HorizontalPostCard: React.FC<PostCardProps> = ({
  title,
  excerpt,
  slug,
  date,
  tags,
  imageUrl,
  comments,
  likes = 0,
}) => {
  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  };


  return (
    <li className="group">
      <Link href={`/posts/${slug}`} title={`${title} 보러가기`}>
        <div className="flex gap-6 p-4 hover:bg-muted/50 rounded-lg transition-colors">
          {/* 이미지 영역 */}
          {imageUrl && (
            <motion.div
              className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 overflow-hidden rounded-md"
              initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={imageUrl}
                alt=""
                width={128}
                height={128}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>
          )}

          {/* 컨텐츠 영역 */}
          <div className="flex-1 flex flex-col min-w-0">
            <Typography
              variant="h4"
              className="group-hover:text-primary transition-colors line-clamp-2 mb-2"
            >
              {title}
            </Typography>

            <Typography
              variant="small"
              className="text-muted-foreground line-clamp-2 mb-auto"
            >
              {excerpt}
            </Typography>

            {/* 메타 정보 */}
            <div className="flex flex-col gap-3 mt-3">
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <Link href={`/posts?tag=${tag}`} key={tag} className="hover:opacity-80">
                      <TagBadge tag={tag} />
                    </Link>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 text-sm text-muted-foreground/80">
                <time>{formatDate(date)}</time>
                <div className="flex items-center gap-3">
                  <Typography variant="small" className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {comments}
                  </Typography>
                  <Typography variant="small" className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {likes}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

const PostCard = {
  Horizontal: HorizontalPostCard,
};

export { PostCard };
