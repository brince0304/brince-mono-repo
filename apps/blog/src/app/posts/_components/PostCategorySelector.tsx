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

          router.replace({
            parameters: { category: selectedCategory, search: undefined, tag: undefined },
          });
        };

        return (
          <Select value={currentCategory} onValueChange={handleRoute}>
            <SelectTrigger className="w-[150px] flex items-center gap-2">
              <SelectValue placeholder="카테고리" />
            </SelectTrigger>
            <SelectContent>
              {uniqueCategories.map((category) => (
                <SelectItem key={category} value={category}>
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
