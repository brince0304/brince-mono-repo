'use client';

import Link from 'next/link';
import type React from 'react';
import { TagBadge } from '@repo/ui/components/TagBadge';
import { Typography } from '@repo/ui/components/ui/typography';
import { PostCardImage } from './PostCardImage';
import { useRouteWithParameters } from '@repo/utils/hooks';

export interface PostCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  tags: string[];
  imageUrl?: string;
  series?: string;
}

const HorizontalPostCard: React.FC<PostCardProps> = ({
  title,
  excerpt,
  slug,
  date,
  tags,
  imageUrl,
}) => {
  const router = useRouteWithParameters();

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  };

  const formattedDate = formatDate(date);

  const handleTagClick = (tag: string) => (e: React.MouseEvent) => {
    e.preventDefault();

    router.push({ baseUrl: '/posts', parameters: { tag } });
  };

  return (
    <li className="group">
      <Link
        href={`/posts/${slug}`}
        title={`${title} 보러가기`}
        className="block"
        aria-label={`${title} 게시글로 이동`}
      >
        <div className="flex gap-6 hover:bg-muted/50 rounded-lg transition-colors p-2 sm:p-4">
          {imageUrl && <PostCardImage imageUrl={imageUrl} title={title} />}

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
                  {/* {series && <TagBadge tag={series} onClick={() => { }} />} */}
                  {tags.map((tag) => (
                    <li key={tag} className="hover:opacity-80">
                      <TagBadge tag={tag} onClick={handleTagClick(tag)} />
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
