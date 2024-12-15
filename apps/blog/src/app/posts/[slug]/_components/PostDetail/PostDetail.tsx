'use client';

import Comments from '../Comments/Comments';
import { TagBadge } from '@repo/ui/TagBadge';
import Link from 'next/link';
import Image from 'next/image';
import type { NotionPage, PageBySlugResponse } from '@/models/notion';
import { Typography } from '@repo/ui/ui/typography';
import PostFloatingButton from '../PostFloatingButton/PostFloatingButton';
import NotionRendererWrap from '@/components/NotionRenderer/NotionRendererWrap';
import SeriesButtons from '../SeriesButtons/SeriesButtons';
import { SeriesNavigation } from '../SeriesNavigation/SeriesNavigation';

interface PostDetailProps {
  post: PageBySlugResponse;
  seriesPosts: NotionPage[];
}

const PostDetail = ({ post, seriesPosts }: PostDetailProps) => {
  const title = post.page.properties.Title.title[0]?.plain_text;
  const excerpt = post.page.properties.Excerpt.rich_text[0]?.plain_text;
  const cover = post.page.properties.Thumbnail?.url;

  const seriesNumber = post.page.properties.SeriesNumber?.number;
  const series = post.page.properties.Series?.select?.name;

  return (
    <article className="flex gap-4 max-w-3xl w-full relative sm:px-0">
      <div className="hidden lg:block sticky top-1/4 h-fit">
        <PostFloatingButton
          pageId={post.page.id}
          column
        />
      </div>
      <div className="flex flex-col w-full flex-1 lg:ml-4 gap-4">
        <header className="flex flex-col gap-4 mt-2">
          <div className="relative w-full aspect-[2/1]">
            {cover && (
              <>
                <Image
                  src={cover}
                  alt={title || '커버 이미지'}
                  fill
                  priority
                  className="object-cover rounded-lg blur-sm"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <Image
                  src={cover}
                  alt={title || '커버 이미지'}
                  fill
                  priority
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="flex flex-col gap-2 absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg backdrop-blur-sm">
                  <Typography
                    variant="h1"
                    className="text-white font-bold px-4 text-center whitespace-break-word text-3xl sm:text-4xl"
                  >
                    {title}
                  </Typography>
                </div>
              </>
            )}
          </div>
          <Typography className="text-md text-muted-foreground">
            {excerpt}
          </Typography>
          <div className="border-t border-gray-200 dark:border-gray-700" />
          <div className="flex flex-wrap gap-2">
            {series &&
              <Link href={`/series/${series}`} key={series}>
                <TagBadge tag={series} />
              </Link>
            }
            {post.page.properties.Tags.multi_select.map((tag) => (
              <Link href={`/posts?tag=${tag.name}`} key={tag.name}>
                <TagBadge tag={tag.name} />
              </Link>
            ))}
          </div>
        </header>
        <div className="flex flex-col py-14 sm:py-10 gap-10">
          {series && <SeriesNavigation
            title={series}
            posts={seriesPosts}
            currentNumber={seriesNumber}
          />}
          <NotionRendererWrap recordMap={post.recordMap} />
        </div>
        <div className="lg:hidden mt-4 flex gap-4">
          <PostFloatingButton
            pageId={post.page.id}
          />
        </div>
        {series && <SeriesButtons
          posts={seriesPosts}
          currentNumber={seriesNumber}
        />}
        <Comments pageId={post.page.id} pageTitle={title || ''} />
      </div>
    </article>
  );
};

export default PostDetail;
