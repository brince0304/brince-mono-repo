import {BLOG_AUTHOR, BLOG_DESCRIPTION, BLOG_IMAGE_URL, BLOG_KEYWORDS, BLOG_TITLE, BLOG_URL} from '@/lib/consts';
import type { NotionPage } from '@/models/notion';
import type { Metadata } from 'next';

interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  publisher?: string;
  type?: 'website' | 'article';
  imageUrl?: string;
  url?: string;
}

export function generateMetadata({
  title = BLOG_TITLE,
  description = BLOG_DESCRIPTION,
  keywords = BLOG_KEYWORDS,
  author = BLOG_AUTHOR,
  publisher = BLOG_AUTHOR,
  type = 'website',
  imageUrl = BLOG_IMAGE_URL,
  url = BLOG_URL,
}: GenerateMetadataOptions = {}): Metadata {
  const metadata: Metadata = {
    title,
    description,
    keywords,
    authors: [{ name: author }],
    publisher,
    icons: {
      icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    },
    robots: 'index, follow',
    openGraph: {
      title,
      description,
      url,
      siteName: BLOG_TITLE,
      locale: 'ko_KR',
      type,
      images: imageUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl,
    },
  };

  return metadata;
}

export function generateBlogPostMetadata(post: NotionPage): Metadata {
  return generateMetadata({
    title: `${post.properties.Title.title[0].plain_text} | ${BLOG_TITLE}`,
    description: post.properties.Excerpt.rich_text[0].plain_text,
    keywords: post.properties.Tags.multi_select.map((tag) => tag.name).join(', ') || BLOG_KEYWORDS,
    type: 'article',
    imageUrl: post.properties.Thumbnail.url || BLOG_IMAGE_URL,
    url: `${BLOG_URL}/posts/${post.id}`,
  });
}

// 홈페이지용 메타데이터 생성 함수
export function generateHomeMetadata(): Metadata {
  return generateMetadata();
}
