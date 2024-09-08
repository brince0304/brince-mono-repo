import type { MetadataRoute } from 'next';
import { notionClient } from '@/lib/notion/notion';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BLOG_URL;

  const staticRoutes = ['', '/posts'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const posts = (await notionClient.getPosts()) ?? [];
  const dynamicRoutes = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.properties.Slug.rich_text[0].plain_text}`,
    lastModified: new Date(post.properties.Date.date?.start || new Date()),
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
