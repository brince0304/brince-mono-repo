'use client';

import { PostQueryKeys } from '@/hooks/post';
import { Input } from '@repo/ui/ui/input';
import { useIsFetching } from '@tanstack/react-query';
import { useDebounce, useIsMounted } from '@toss/react';
import { useRef, useState } from 'react';
import { useQueryString, useRouteWithParameters } from '@repo/utils/hooks';

const PostSearch = () => {
  const isMounted = useIsMounted();
  const isPostFetching = useIsFetching({
    queryKey: PostQueryKeys.GET_POSTS,
  });

  const { tag, search, category } = useQueryString(['tag', 'search', 'category']);
  const router = useRouteWithParameters();

  const [input, setInput] = useState(search ?? '');
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = useDebounce((value: string) => {
    router.replace({
      parameters: { search: value, tag, category },
    });
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    debouncedSearch(value);
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
        isLoading={isMounted && isPostFetching > 0}
        value={input}
        onChange={handleInputChange}
        onClear={input ? handleClear : undefined}
        ref={inputRef}
      />
    </div>
  );
};

export default PostSearch;
