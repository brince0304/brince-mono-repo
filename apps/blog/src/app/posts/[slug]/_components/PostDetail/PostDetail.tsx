import NotionPage from '@/components/NotionPage/NotionPage';
import PostFloatingButton from '../PostFloatingButton/PostFloatingButton';
import { getPostLikeStatus } from '@/lib/cookie';
import type { PageBySlugResponse } from '@/models/notion';
import { BrinceAvatar } from '@repo/ui/BrinceAvatar';
import { SimplifiedProfile } from '@repo/ui/SimplifiedProfile';
import { Typography } from '@repo/ui/ui/typography';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import type React from 'react';
import Comments from '../Comments/Comments';
import CommentForm from '../CommentForm/CommentForm';
import { TagBadge } from '@repo/ui/TagBadge';
import Link from 'next/link';

interface PostDetailProps {
  post: PageBySlugResponse;
}

const PostDetail: React.FC<PostDetailProps> = async ({ post }) => {
  const isLiked = await getPostLikeStatus(post.page.id);

  const title = post.page.properties.Title.title[0]?.plain_text;
  const excerpt = post.page.properties.Excerpt.rich_text[0]?.plain_text;

  return (
    <article className="flex gap-4 max-w-3xl w-full relative sm:px-0">
      <div className="hidden lg:block sticky top-1/4 h-fit">
        <PostFloatingButton
          isLiked={isLiked}
          pageId={post.page.id}
          count={post.page.properties.Likes.number}
          column
        />
      </div>
      <div className="flex flex-col w-full flex-1 lg:ml-4 gap-4">
        <header className="flex flex-col gap-3">
          <Typography variant={'h1'} className={'font-bold'}>
            {title}
          </Typography>
          <Typography variant={'large'} className="text-gray-500 dark:text-gray-400">
            {excerpt}
          </Typography>
          <section className="flex gap-1 items-center">
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
          <div className="border-t border-gray-200 dark:border-gray-700" />
        </header>
        <NotionPage recordMap={post.recordMap} />
        <SimplifiedProfile />
        <div className="lg:hidden mt-4 flex gap-4">
          <PostFloatingButton
            isLiked={isLiked}
            pageId={post.page.id}
            count={post.page.properties.Likes.number}
          />
        </div>
        <Comments pageId={post.page.id} />
        <div className="border-t border-gray-200 dark:border-gray-700" />
        <CommentForm pageId={post.page.id} />
      </div>
    </article>
  );
};

export default PostDetail;
