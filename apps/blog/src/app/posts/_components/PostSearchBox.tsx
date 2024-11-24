'use client';

import { PostQueryKeys } from '@/hooks/post';
import { Input } from '@repo/ui/ui/input';
import { useIsFetching } from '@tanstack/react-query';
import { useDebounce } from '@toss/react';
import { useRef, useState } from 'react';
import { useQueryString, useRouteWithParameters } from '@repo/utils/hooks';

const PostSearch = () => {
  const isPostFetching = useIsFetching({
    queryKey: PostQueryKeys.GET_POSTS,
  });

  const { tag, search, category } = useQueryString(['tag', 'search', 'category']);
  const router = useRouteWithParameters();

  const [input, setInput] = useState(search ?? '');
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = useDebounce((value: string) => {
    if (value) {
      router.replace({
        parameters: { search: value, tag, category },
      });

      return;
    }

    router.replace({
      parameters: { search: undefined, tag, category },
    });
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    debouncedSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (input) {
        router.replace({
          parameters: { search: input, tag, category },
        });

        return;
      }

      router.replace({
        parameters: { search: undefined, tag, category },
      });
    }
  };

  const handleClear = () => {
    debouncedSearch('');
    setInput('');
  };

  return (
    <div className="flex-grow">
      <Input
        type="text"
        placeholder="검색어를 입력해주세요."
        inputMode="search"
        autoComplete="off"
        className="resize-none"
        isLoading={isPostFetching > 0}
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onClear={input ? handleClear : undefined}
        ref={inputRef}
      />
    </div>
  );
};

export default PostSearch;
