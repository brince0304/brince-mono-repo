import type { MetadataRoute } from 'next';
import { notionClient } from '@/lib/notion/notion';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BLOG_URL;

  const staticRoutes = ['', '/posts'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const posts = (await notionClient.getPosts()) ?? [];
  const dynamicRoutes = posts.map((post) => {
    const slug = post.properties.Slug.rich_text[0]?.plain_text || '';

    return {
      url: `${baseUrl}/posts/${slug}`,
      lastModified: new Date(),
    };
  });

  return [...staticRoutes, ...dynamicRoutes];
}
