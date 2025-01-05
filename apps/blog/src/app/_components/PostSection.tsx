'use client';

import { TextGrid } from '@repo/ui/TextGrid';
import PostList from './PostList';
import { wrap } from '@suspensive/react';
import { SuspenseInfiniteQuery } from '@suspensive/react-query';
import { PostQueryOptions } from '@/hooks/post';
import type { NotionPage } from '@/models/notion';
import { nanoid } from 'nanoid';

const PostSection = wrap.Suspense().on(() => (
  <section className={'flex flex-col gap-4'}>
    <TextGrid title={'최근 포스트'} description={'여러 이야기를 다루고 있어요 🤗'} />
    <SuspenseInfiniteQuery {...PostQueryOptions.getInfinitePosts({})}>
      {({ data }) => {
        return data.pages.map((page) => <PostList key={nanoid()} posts={page as NotionPage[]} />);
      }}
    </SuspenseInfiniteQuery>
  </section>
));

export default PostSection;
