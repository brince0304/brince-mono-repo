import { serverFetcher } from '@/lib/client';
import { generateBlogPostMetadata } from '@/lib/meta';
import type { NotionPage, PageBySlugResponse } from '@/models/notion';
import type { Metadata } from 'next';
import PostDetail from './_components/PostDetail/PostDetail';
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { generateMetadata as generateDefaultMetadata } from '@/lib/meta';
import { notionClient } from '@/lib/notion/notion';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: { params: { slug: string } }): Promise<Metadata> {
  try {
    const article = await serverFetcher<PageBySlugResponse>(`/posts/${params.slug}`);

    if (!article?.page) {
      throw new Error('Post not found');
    }

    return generateBlogPostMetadata(article.page);
  } catch (error) {
    console.error(`Failed to generate metadata for slug: ${params.slug}`, error);
    return generateDefaultMetadata({
      title: '페이지를 찾을 수 없습니다',
      description: '요청하신 게시글을 찾을 수 없습니다.',
    });
  }
}

export async function generateStaticParams() {
  const articles = await serverFetcher<QueryDatabaseResponse>('/posts');
  const results = articles.results as NotionPage[];

  return results.map((article) => ({
    slug: article.properties?.Slug?.rich_text[0]?.plain_text,
  }));
}

export const dynamic = 'force-static';
export const revalidate = 3600;

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await notionClient.getPageBySlug(params.slug);

  if (!post?.page.properties.Published.checkbox) {
    notFound();
  }

  return (
    <div className="flex sm:mt-4 mt-5">
      <PostDetail post={post as PageBySlugResponse} />
    </div>
  );
}
