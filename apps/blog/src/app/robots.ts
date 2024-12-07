import type { MetadataRoute } from 'next';

export const revalidate = 21600

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${process.env.NEXT_PUBLIC_BLOG_URL}/sitemap.xml`,
  };
}
