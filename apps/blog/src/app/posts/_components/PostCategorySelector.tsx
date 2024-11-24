'use client';

import { PostQueryOptions } from '@/hooks/post';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/ui/select';
import { useQueryString, useRouteWithParameters } from '@repo/utils/hooks';
import { wrap } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';

const PostCategorySelector = wrap.Suspense({ fallback: null }).on(() => {
  return (
    <SuspenseQuery {...PostQueryOptions.getCategories()}>
      {({ data }) => {
        const router = useRouteWithParameters();
        const uniqueCategories = [...new Set(data)];

        const { category: currentCategory } = useQueryString(['category']);

        const handleRoute = (selectedCategory: string) => {
          if (currentCategory === selectedCategory) return;
          if (selectedCategory === 'all') {
            router.replace({ parameters: { category: undefined } });
            return;
          }

          router.replace({ parameters: { category: selectedCategory } });
        };

        return (
          <Select value={currentCategory ?? 'all'} onValueChange={handleRoute}>
            <SelectTrigger className="w-[150px] flex items-center gap-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" >
                전체
              </SelectItem>
              {uniqueCategories.map((category) => (
                <SelectItem key={category} value={category} onClick={() => handleRoute(category)}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }}
    </SuspenseQuery>
  );
});

export default PostCategorySelector;
