import { serverFetcher } from '@/lib/client';
import type { NotionPagesResponse } from '@/models/notion';
import { PostCard } from '@brince-mono-repo/shared-components';
import {convertToPostCardProps} from "@/lib/notion/convert";

const Posts = async () => {
  const posts = await serverFetcher<NotionPagesResponse>('posts');

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <ul className={'grid grid-cols-1 gap-4 md:grid-cols-3'}>
      {posts
        .map((post) => convertToPostCardProps(post))
        .map((props) => (
          <PostCard key={props.slug} {...props} />
        ))}
    </ul>
  );
};

export default Posts;
