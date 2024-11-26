import { serverFetcher } from '@/lib/client';
import { generateBlogPostMetadata } from '@/lib/meta';
import type { NotionPage, PageBySlugResponse } from '@/models/notion';
import type { Metadata } from 'next';
import PostDetail from './_components/PostDetail/PostDetail';
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

export async function generateMetadata({
  params,
}: { params: { slug: string } }): Promise<Metadata> {
  const article = await serverFetcher<PageBySlugResponse>(`/posts/${params.slug}`);

  return generateBlogPostMetadata(article.page);
}

export async function generateStaticParams() {
  const articles = await serverFetcher<QueryDatabaseResponse>('/posts');
  const results = articles.results as NotionPage[];

  return results.map((article) => ({
    slug: article.properties?.Slug?.rich_text[0]?.plain_text,
  }));
}

export const dynamic = 'force-static';

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await serverFetcher<PageBySlugResponse>(`/posts/${params.slug}`);

  return (
    <div className="flex">
      <PostDetail post={post} />
    </div>
  );
}
