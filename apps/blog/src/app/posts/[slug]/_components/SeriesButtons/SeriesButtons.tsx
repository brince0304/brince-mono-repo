import type { NotionPage } from '@/models/notion';
import { Button } from '@repo/ui/ui/button';
import { Typography } from '@repo/ui/ui/typography';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';
import Link from 'next/link';

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
    const label = type === 'prev' ? '이전 포스트' : '다음 포스트';
    const icon = type === 'prev' ? <CircleArrowLeft className="w-8 h-8" /> : <CircleArrowRight className="w-8 h-8" />;

    const content = (
      <div className={`flex items-center gap-4 ${type === 'prev' ? 'flex-row' : 'flex-row-reverse'} w-full`}>
        <span className="text-lg">{icon}</span>
        <div className={`flex flex-col gap-1 ${type === 'prev' ? 'items-start' : 'items-end'} flex-1`}>
          <Typography variant="muted" className="text-xs">
            {label}
          </Typography>
          <Typography variant="p" className="truncate max-w-[200px] sm:max-w-none">
            {title}
          </Typography>
        </div>
      </div>
    );

    return (
      <Button variant="outline" asChild className="flex-1 h-auto py-3 sm:py-4 w-full">
        <Link href={`/posts/${slug}`} className="block w-full" scroll={true}>
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
