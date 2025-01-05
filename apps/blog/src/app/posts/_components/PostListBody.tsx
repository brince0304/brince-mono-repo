'use client';

import { wrap } from '@suspensive/react';
import { PostListSkeleton } from '@repo/ui/skeletons/PostListSkeleton';
import { Typography } from '@repo/ui/ui/typography';
import { SuspenseInfiniteQuery } from '@suspensive/react-query';
import { PostQueryOptions } from '@/hooks/post';
import PostList from '@/app/_components/PostList';
import type { NotionPage } from '@/models/notion';
import { useQueryString } from '@repo/utils/hooks';
import { ChevronDown, Loader2 } from 'lucide-react';
import { Button } from '@repo/ui/ui/button';
import { nanoid } from 'nanoid';
const PostListBody = wrap
  .Suspense({ fallback: <PostListSkeleton /> })
  .ErrorBoundary({
    fallback: (
      <div className="flex flex-col gap-4">
        <Typography variant="p">게시글을 불러오는 중 오류가 발생했어요 🥲</Typography>
      </div>
    ),
  })
  .on(() => {
    const { search, tag, category } = useQueryString(['search', 'tag', 'category']);

    return (
      <SuspenseInfiniteQuery
        {...PostQueryOptions.getInfinitePosts({
          search,
          tag,
          category,
        })}
      >
        {({ data, isFetchingNextPage, hasNextPage, fetchNextPage }) => {
          if (!data.pages) {
            return (
              <div className="flex flex-col items-center justify-center min-h-[200px] gap-4 rounded-lg border border-dashed border-muted p-8">
                <Typography variant="p" className="text-muted-foreground">
                  아직 게시글이 없어요 ✍️
                </Typography>
              </div>
            );
          }

          return (
            <div>
              {data.pages.map((page) => (
                <PostList key={nanoid()} posts={page as NotionPage[]} />
              ))}
              {hasNextPage && (
                <Button
                  variant="outline"
                  onClick={() => fetchNextPage()}
                  className="w-full p-4 mt-8 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg border border-dashed border-muted hover:border-muted-foreground flex items-center justify-center gap-2"
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      불러오고 있어요 🤓
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 animate-bounce" />
                      더 보기 📖
                    </>
                  )}
                </Button>
              )}
            </div>
          )
        }}
      </SuspenseInfiniteQuery>
    );
  });

export default PostListBody;
