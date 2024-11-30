'use client';

import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { TagBadge } from '@repo/ui/components/TagBadge';
import { Typography } from '@repo/ui/components/ui/typography';
import { motion } from 'framer-motion';

export interface PostCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  tags: string[];
  imageUrl?: string;
}

const HorizontalPostCard: React.FC<PostCardProps> = ({
  title,
  excerpt,
  slug,
  date,
  tags,
  imageUrl,
}) => {
  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  };

  const formattedDate = formatDate(date);

  return (
    <li className="group">
      <Link
        href={`/posts/${slug}`}
        title={`${title} 보러가기`}
        className="block"
        aria-label={`${title} 게시글로 이동`}
      >
        <div className="flex gap-6 hover:bg-muted/50 rounded-lg transition-colors p-2 sm:p-4">
          {/* 이미지 영역 */}
          {imageUrl && (
            <motion.div
              className="flex-shrink-0 w-20 h-20 sm:w-32 sm:h-32 overflow-hidden rounded-md"
              initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={imageUrl}
                alt={`${title}의 대표 이미지`}
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

            <Typography variant="small" className="text-muted-foreground line-clamp-2 mb-auto">
              {excerpt}
            </Typography>

            {/* 메타 정보 */}
            <div className="flex flex-col gap-3 mt-3">
              {tags.length > 0 && (
                <ul className="flex flex-wrap gap-1.5" aria-label="태그 목록">
                  {tags.map((tag) => (
                    <li key={tag}>
                      <Link
                        href={`/posts?tag=${tag}`}
                        className="hover:opacity-80"
                        aria-label={`${tag} 태그로 필터링하기`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <TagBadge tag={tag} />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex items-center gap-4 text-sm text-muted-foreground/80">
                <time dateTime={date} aria-label="작성일">
                  {formattedDate}
                </time>
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
