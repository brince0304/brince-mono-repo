import { TextGrid } from '@repo/ui/TextGrid';

import { generateSeriesMetadata } from '@/lib/meta';
import type { Metadata } from 'next';
import { notionClient } from '@/lib/notion/notion';
import { convertSeriesFromPosts } from '@/components/Postcard/PostCard.utils';
import type { NotionPage } from '@/models/notion';
import SeriesPostCards from './_components/SeriesPostCards';
export const generateMetadata = async (): Promise<Metadata> => {
  return generateSeriesMetadata();
};

export const revalidate = 3600;

export default async function PostsPage() {
  const series = (await notionClient.getPostSeries()) as NotionPage[];
  const seriesList = convertSeriesFromPosts(series);

  return (
    <main className="flex flex-col gap-4">
      <TextGrid title="시리즈" description="이어읽으면 재밌을거에요 👋🏻" />
      <SeriesPostCards seriesList={seriesList} />
    </main>
  );
}
