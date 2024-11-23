'use client';

import { PostQueryKeys, PostQueryOptions } from '@/hooks/post';
import { TagBadge } from '@repo/ui/components/TagBadge';
import { Badge } from '@repo/ui/ui/badge';
import { Typography } from '@repo/ui/ui/typography';
import { wrap } from '@suspensive/react';
import { SuspenseInfiniteQuery } from '@suspensive/react-query';
import { ChevronDownIcon, ChevronUpIcon, Loader2, PlusIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useIsFetching } from '@tanstack/react-query';

const PostTags = wrap
  .ErrorBoundary({
    fallback: (
      <div className="flex justify-center items-center text-muted-foreground text-sm">
        <Typography variant={'p'}>태그를 불러오는 중 오류가 발생했어요 😢</Typography>
      </div>
    ),
  })
  .Suspense({
    fallback: (
      <div className="flex justify-center items-center text-muted-foreground text-sm gap-1">
        <Loader2 className="h-4 w-4 animate-spin" />
        <Typography variant={'p'}>게시글 태그를 불러오고 있어요</Typography>
      </div>
    ),
  })
  .on(() => (
    <SuspenseInfiniteQuery {...PostQueryOptions.getInfiniteTags()}>
      {({ data, isFetchingNextPage, hasNextPage, fetchNextPage }) => {
        const router = useRouter();
        const searchParams = useSearchParams();
        const selectedTag = searchParams.get('tag');
        const uniqueTags = new Set<string>(data.pages.flat());

        const [isOpen, setIsOpen] = useState(true);

        const isPostFetching = useIsFetching({
          queryKey: PostQueryKeys.GET_POSTS,
        });

        const handleTagClick = useCallback(
          (tag: string) => {
            const params = new URLSearchParams(window.location.search);
            if (selectedTag === tag) {
              params.delete('tag');
            } else {
              params.set('tag', tag);
            }
            router.replace(`?${params.toString()}`);
          },
          [router, selectedTag]
        );

        useEffect(() => {
          if (selectedTag && !uniqueTags.has(selectedTag)) {
            const params = new URLSearchParams(window.location.search);
            params.delete('tag');
            router.replace(`?${params.toString()}`);
          }
        }, [uniqueTags, selectedTag, router]);

        return (
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <motion.div
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                  className="flex flex-wrap gap-2"
                >
                  {Array.from(uniqueTags).map((tag) => (
                    <TagBadge
                      key={tag}
                      tag={tag}
                      useTooltip={false}
                      isActive={selectedTag === tag}
                      onClick={() => handleTagClick(tag)}
                      disabled={isPostFetching > 0}
                    />
                  ))}
                  {hasNextPage && (
                    <Badge
                      onClick={() => fetchNextPage()}
                      className={`cursor-pointer ${isFetchingNextPage ? 'opacity-50' : ''}`}
                      disabled={isPostFetching > 0}
                    >
                      {isFetchingNextPage ? (
                        <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                      ) : (
                        <PlusIcon className="mr-1 h-4 w-4" />
                      )}
                      더보기
                    </Badge>
                  )}
                </motion.div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Typography variant="p" className="text-sm text-muted-foreground">
                태그로도 검색해보세요 🤗
              </Typography>
              <Badge
                onClick={() => setIsOpen((prev) => !prev)}
                className="whitespace-nowrap cursor-pointer"
              >
                {isOpen ? (
                  <ChevronUpIcon className="h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4" />
                )}
              </Badge>
            </div>
          </div>
        );
      }}
    </SuspenseInfiniteQuery>
  ));

export default PostTags;
