'use client';

import NotionPage from '@/components/NotionPage/NotionPage';
import { BrinceAvatar } from '@repo/ui/BrinceAvatar';
import { SimplifiedProfile } from '@repo/ui/SimplifiedProfile';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import Comments from '../Comments/Comments';
import { TagBadge } from '@repo/ui/TagBadge';
import Link from 'next/link';
import Image from 'next/image';
import type { PageBySlugResponse } from '@/models/notion';
import { Typography } from '@repo/ui/ui/typography';
import PostFloatingButton from '../PostFloatingButton/PostFloatingButton';

interface PostDetailProps {
  post: PageBySlugResponse;
}

const PostDetail = ({ post }: PostDetailProps) => {
  const title = post.page.properties.Title.title[0]?.plain_text;
  const excerpt = post.page.properties.Excerpt.rich_text[0]?.plain_text;
  const cover = post.page.properties.Thumbnail?.url;

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
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg backdrop-blur-sm">
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

          <section className="flex gap-2 items-center">
            <div className="flex justify-center items-center gap-2">
              <BrinceAvatar className={'w-8 h-8'} />
              <Typography variant={'small'}>브린스</Typography>
            </div>
            <Typography
              variant={'small'}
              className="text-gray-500 dark:text-gray-400 before:content-['·'] before:mr-1"
            >
              {formatDistanceToNow(new Date(post.page.properties.Date.date?.start || ''), {
                addSuffix: true,
                locale: ko,
              })}
            </Typography>
          </section>
          <div className="flex flex-wrap gap-2">
            {post.page.properties.Tags.multi_select.map((tag) => (
              <Link href={`/posts?tag=${tag.name}`} key={tag.name}>
                <TagBadge tag={tag.name} />
              </Link>
            ))}
          </div>
        </header>
        <div className="flex flex-col py-14 sm:py-10 gap-10">
          <NotionPage recordMap={post.recordMap} />
          <SimplifiedProfile />
        </div>
        <div className="lg:hidden mt-4 flex gap-4">
          <PostFloatingButton
            pageId={post.page.id}
          />
        </div>
        <Comments pageId={post.page.id} pageTitle={title || ''} />
      </div>
    </article>
  );
};

export default PostDetail;
