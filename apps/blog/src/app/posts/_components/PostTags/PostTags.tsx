'use client';

import { PostQueryOptions } from '@/hooks/post';
import { TagBadge } from '@repo/ui/components/TagBadge';
import { Badge } from '@repo/ui/ui/badge';
import { Typography } from '@repo/ui/ui/typography';
import { wrap } from '@suspensive/react';
import { SuspenseInfiniteQuery } from '@suspensive/react-query';
import { ChevronDownIcon, ChevronUpIcon, Loader2, PlusIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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

        const [isOpen, setIsOpen] = useState(true);

        const uniqueTags = new Set<string>(data.pages.flat());
        const searchParams = useSearchParams();
        const selectedTags = searchParams.getAll('tag');

        const isTagActive = (tag: string) => selectedTags.includes(tag);

        const updateSearchParams = useCallback(
          (tags: string[]) => {
            const newSearchParams = new URLSearchParams(window.location.search);
            newSearchParams.delete('tag');

            for (const tag of tags) {
              newSearchParams.append('tag', tag);
            }

            router.replace(`?${newSearchParams.toString()}`);
          },
          [router]
        );

        const toggleTag = (tag: string) => {
          const newTags = selectedTags.includes(tag)
            ? selectedTags.filter((t) => t !== tag)
            : [...selectedTags, tag];

          updateSearchParams(newTags);
        };

        useEffect(() => {
          const validTags = selectedTags.filter((tag) => uniqueTags.has(tag));
          if (validTags.length !== selectedTags.length) {
            updateSearchParams(validTags);
          }
        }, [uniqueTags, selectedTags, updateSearchParams]);

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
                      isActive={isTagActive(tag)}
                      onClick={() => toggleTag(tag)}
                    />
                  ))}
                  {hasNextPage && (
                    <Badge
                      onClick={() => fetchNextPage()}
                      className={`cursor-pointer ${isFetchingNextPage ? 'opacity-50' : ''}`}
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
                태그는 중복 선택이 가능해요 🤗
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
