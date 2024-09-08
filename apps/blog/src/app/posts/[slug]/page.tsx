import { serverFetcher } from '@/lib/client';
import { generateBlogPostMetadata } from '@/lib/metadata';
import type { PageBySlugResponse } from '@/models/notion';
import type { Metadata } from 'next';
import PostDetail from '@/components/Post/PostDetail/PostDetail';

export async function generateMetadata({
  params,
}: { params: { slug: string } }): Promise<Metadata> {
  const article = await serverFetcher<PageBySlugResponse>(`/posts/${params.slug}`);

  return generateBlogPostMetadata(article.page);
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await serverFetcher<PageBySlugResponse>(`/posts/${params.slug}`, {
    cache: 'no-store',
  });

  return (
    <div className="flex">
      <PostDetail post={post} />
    </div>
  );
}
