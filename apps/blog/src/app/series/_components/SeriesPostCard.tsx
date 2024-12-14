'use client';

import { PostCard, type PostCardProps } from "@/components/Postcard/PostCard";
import { Typography } from "@repo/ui/ui/typography";
import Image from "next/image";

export interface SeriesCardProps {
  list: PostCardProps[]
  seriesTitle: string
  seriesDescription: string
  isSelected?: boolean
  onClick?: (e: React.MouseEvent<HTMLLIElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLLIElement>) => void
}

const SeriesCard: React.FC<SeriesCardProps> = ({
  list,
  seriesTitle,
  seriesDescription,
  isSelected,
  onClick,
  onKeyDown,
}) => {
  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  };

  const lastUpdated = list[0]?.date ?? '';

  return (
    <li className="group marker:content-none cursor-pointer" onClick={onClick} onKeyDown={onKeyDown} aria-selected={isSelected} aria-label={seriesTitle}>
      <div className="flex gap-6 hover:bg-muted/50 rounded-lg transition-colors p-4">
        <div className="grid grid-cols-2 gap-2  sm:w-36 sm:h-36 w-24 h-24 shrink-0">
          {Array.from({ length: 4 }).map((_, index) => {
            const post = list[index];
            const isVisible = index < list.length;

            return (
              <div
                key={post?.slug ?? index}
                className={`relative aspect-square bg-muted rounded-md overflow-hidden ${!isVisible ? 'opacity-30' : ''}`}
              >
                {post?.imageUrl && isVisible ? (
                  <Image
                    src={post.imageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                    width={144}
                    height={144}
                  />
                ) : (
                  <div className="w-full h-full bg-muted" />
                )}
              </div>
            );
          })}
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <Typography
            variant="h4"
            className="group-hover:text-primary transition-colors line-clamp-2 mb-2"
          >
            {seriesTitle}
          </Typography>

          <Typography variant="small" className="text-muted-foreground line-clamp-2 mb-4">
            {seriesDescription}
          </Typography>
          <div className="flex items-center gap-4 text-sm text-muted-foreground/80 mt-auto">
            <span className="hidden sm:block">총 {list.length}개</span>
            <time dateTime={lastUpdated} aria-label="마지막 업데이트">
              업데이트: {formatDate(lastUpdated)}
            </time>
          </div>
        </div>
      </div>
      {isSelected && (
        <ul className="flex flex-col gap-2 scale-95">
          {list.map((post) => (
            <PostCard.Horizontal key={post.slug} {...post} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SeriesCard;
