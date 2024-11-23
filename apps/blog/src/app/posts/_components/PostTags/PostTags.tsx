'use client';

import { PostQueryOptions } from '@/hooks/post';
import { TagBadge } from '@repo/ui/components/TagBadge';
import { Badge } from '@repo/ui/ui/badge';
import { Typography } from '@repo/ui/ui/typography';
import { wrap } from '@suspensive/react';
import { SuspenseInfiniteQuery } from '@suspensive/react-query';
import { Loader2, PlusIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

const PostTags = wrap
  .ErrorBoundary({
    fallback: (
      <div className="flex justify-center items-center text-muted-foreground">
        <Typography variant={'p'}>태그를 불러오는 중 오류가 발생했어요 😢</Typography>
      </div>
    ),
  })
  .Suspense({
    fallback: null,
  })
  .on(() => (
    <SuspenseInfiniteQuery {...PostQueryOptions.getInfiniteTags()}>
      {({ data, isFetchingNextPage, hasNextPage, fetchNextPage }) => {
        const router = useRouter();
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
          <div className="flex flex-col gap-0">
            <div className="w-full flex flex-wrap">
              {Array.from(uniqueTags).map((tag) => (
                <div key={tag} className="mr-2 mb-2">
                  <TagBadge
                    tag={tag}
                    useTooltip={false}
                    isActive={isTagActive(tag)}
                    onClick={() => toggleTag(tag)}
                  />
                </div>
              ))}
              {hasNextPage && (
                <div className="mr-2 mb-2">
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
                </div>
              )}
            </div>
            <Typography variant="p" className="text-sm text-muted-foreground">
              태그는 중복 선택이 가능해요 🤗
            </Typography>
          </div>
        );
      }}
    </SuspenseInfiniteQuery>
  ));

export default PostTags;
