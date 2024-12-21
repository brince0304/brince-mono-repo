'use client';

import { TextGrid } from '@repo/ui/TextGrid';
import PostList from './PostList';
import { wrap } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { PostQueryOptions } from '@/hooks/post';
import type { NotionPage } from '@/models/notion';

const PostSection = wrap.Suspense().on(() => (
  <section className={'flex flex-col gap-4'}>
    <TextGrid title={'최근 포스트'} description={'여러 이야기를 다루고 있어요 🤗'} />
    <SuspenseQuery {...PostQueryOptions.getPosts({})}>
      {({ data: { results } }) => results && <PostList posts={results as NotionPage[]} />}
    </SuspenseQuery>
  </section>
));

export default PostSection;
