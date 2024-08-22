import CommentForm from '@/components/CommentForm/CommentForm';
import Comments from '@/components/Comments/Comments';
import { serverFetcher } from '@/lib/client';
import type { PageBySlugResponse } from '@/models/notion';
import { Text } from '@brince-mono-repo/shared-components';
import ReactMarkdown from 'react-markdown';

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await serverFetcher<PageBySlugResponse>(`posts/${params.slug}`);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article>
      <Text variant={'h1'}>{post.page.properties.Title.title[0].plain_text}</Text>
      <ReactMarkdown className="markdown-body">{String(post.markdown)}</ReactMarkdown>
      {!!post.page.id && (
        <>
          <Comments pageId={post.page.id} />
          <CommentForm pageId={post.page.id} />
        </>
      )}
    </article>
  );
}
