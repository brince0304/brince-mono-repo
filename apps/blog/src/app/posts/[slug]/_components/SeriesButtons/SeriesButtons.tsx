import type { NotionPage } from "@/models/notion";
import { Button } from "@repo/ui/ui/button";
import { Typography } from "@repo/ui/ui/typography";
import Image from "next/image";
import Link from "next/link";

interface SeriesButtonsProps {
  posts: NotionPage[];
  currentNumber: number;
}

const SeriesButtons = ({ posts, currentNumber }: SeriesButtonsProps) => {
  const prevPost = posts[currentNumber - 2];
  const nextPost = posts[currentNumber];

  const renderPostButton = (post: NotionPage | undefined, type: 'prev' | 'next') => {
    if (!post) return <div className="flex-1 hidden sm:block" />;

    const slug = post.properties.Slug.rich_text[0]?.plain_text;
    const title = post.properties.Title.title[0]?.plain_text;
    const thumbnail = post.properties.Thumbnail.url || '';
    const label = type === 'prev' ? '이전 포스트' : '다음 포스트';

    const content = (
      <>
        {type === 'prev' && (
          <div className="flex items-center justify-center">
            <Image
              src={thumbnail}
              alt={title || ''}
              width={50}
              height={50}
              className="object-cover rounded-sm"
            />
          </div>
        )}
        <div className={`flex flex-col items-${type === 'prev' ? 'start' : 'end'} gap-1`}>
          <Typography variant="muted" className="text-xs">{label}</Typography>
          <Typography variant="p" className="truncate max-w-[200px] sm:max-w-none">
            {title}
          </Typography>
        </div>
        {type === 'next' && (
          <div className="flex items-center justify-center">
            <Image
              src={thumbnail}
              alt={title || ''}
              width={50}
              height={50}
              className="object-cover rounded-sm"
            />
          </div>
        )}
      </>
    );

    return (
      <Button
        variant="outline"
        asChild
        className="flex-1 h-auto py-3 sm:py-4"
      >
        <Link href={`/posts/${slug}`} className="flex items-center gap-4" scroll={true}>
          {content}
        </Link>
      </Button>
    );
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
      {renderPostButton(prevPost, 'prev')}
      {renderPostButton(nextPost, 'next')}
    </div>
  );
};

export default SeriesButtons;
