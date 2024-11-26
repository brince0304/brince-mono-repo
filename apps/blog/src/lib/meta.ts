import {
  BLOG_AUTHOR,
  BLOG_DESCRIPTION,
  BLOG_IMAGE_URL,
  BLOG_KEYWORDS,
  BLOG_TITLE,
  BLOG_URL,
} from '@/lib/consts';
import type { NotionPage } from '@/models/notion';
import type { Metadata } from 'next';
import type { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

interface MetadataBase {
  title: string;
  description: string;
  keywords: string;
  url: string;
  imageUrl: string;
}

interface SchemaOrgArticle {
  '@type': string;
  headline: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    '@type': string;
    name: string;
  };
  keywords?: string;
}

interface GenerateMetadataOptions extends Partial<MetadataBase> {
  author?: string;
  type?: 'website' | 'article';
  canonicalUrl?: string;
  openGraph?: OpenGraph;
  schema?: SchemaOrgArticle;
}

// 기본값을 상수로 분리
const DEFAULT_METADATA: MetadataBase = {
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
  keywords: BLOG_KEYWORDS,
  url: BLOG_URL,
  imageUrl: BLOG_IMAGE_URL,
};

// 핵심 메타데이터 생성 함수
export function generateMetadata({
  title = DEFAULT_METADATA.title,
  description = DEFAULT_METADATA.description,
  keywords = DEFAULT_METADATA.keywords,
  author = BLOG_AUTHOR,
  type = 'website',
  imageUrl = DEFAULT_METADATA.imageUrl,
  url = DEFAULT_METADATA.url,
  canonicalUrl,
  openGraph,
}: GenerateMetadataOptions = {}): Metadata {
  const finalTitle = title === BLOG_TITLE ? title : `${title} | ${BLOG_TITLE}`;
  
  return {
    title: finalTitle,
    description,
    keywords,
    authors: [{ name: author }],
    publisher: author,
    icons: {
      icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    },
    robots: 'index, follow',
    openGraph: {
      title: finalTitle,
      description,
      url,
      siteName: BLOG_TITLE,
      locale: 'ko_KR',
      type,
      images: imageUrl,
      ...openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description,
      images: imageUrl,
    },
    alternates: {
      canonical: canonicalUrl || url,
    },
  };
}

export function generateBlogPostMetadata(post: NotionPage): Metadata {
  if (!post?.properties) {
    return generateMetadata();
  }

  const publishedTime = post.properties.Date?.date?.start;
  const modifiedTime = post.properties.Date?.date?.start;
  const title = post.properties.Title?.title[0]?.plain_text || DEFAULT_METADATA.title;
  const description = post.properties.Excerpt?.rich_text[0]?.plain_text || '';
  const tags = post.properties.Tags?.multi_select?.map(tag => tag.name) || [];
  const slug = post.properties.Slug?.rich_text[0]?.plain_text;
  const imageUrl = post.properties.Thumbnail?.url || DEFAULT_METADATA.imageUrl;

  return generateMetadata({
    title,
    description,
    keywords: tags.join(', ') || DEFAULT_METADATA.keywords,
    canonicalUrl: `${BLOG_URL}/posts/${slug}`,
    imageUrl,
    type: 'article',
    openGraph: {
      type: 'article',
      authors: [BLOG_AUTHOR],
      publishedTime,
      modifiedTime,
      tags,
      section: post.properties.Category?.select?.name || 'Blog',
    },
    schema: {
      '@type': 'BlogPosting',
      headline: title,
      datePublished: publishedTime,
      dateModified: modifiedTime,
      author: {
        '@type': 'Person',
        name: BLOG_AUTHOR,
      },
      keywords: tags.join(','),
    }
  });
}

// 특정 페이지 메타데이터 생성 함수들
export const generateHomeMetadata = () => generateMetadata();

export const generatePostsMetadata = () => generateMetadata({
  title: '프론트엔드 개발 아티클',
  description: '여러 아티클을 공유합니다.',
  url: `${BLOG_URL}/posts`,
  canonicalUrl: `${BLOG_URL}/posts`,
});
