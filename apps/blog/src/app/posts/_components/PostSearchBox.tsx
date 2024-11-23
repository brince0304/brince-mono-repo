'use client';

import { PostQueryKeys } from '@/hooks/post';
import { Input } from '@repo/ui/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/ui/select';
import { useIsFetching } from '@tanstack/react-query';
import { useDebounce } from '@toss/react';
import { useEffect, useRef, useState } from 'react';
import { useQueryString, useRouteWithParameters } from '@repo/utils/hooks';

const PostSearchBox = () => {
  const isPostFetching = useIsFetching({
    queryKey: PostQueryKeys.GET_POSTS,
  });

  const { tag, search } = useQueryString(['tag', 'search']);
  const router = useRouteWithParameters();

  const [input, setInput] = useState(search ?? '');
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = useDebounce((value: string) => {
    if (value) {
      router.replace({
        parameters: { search: value, tag },
      });

      return;
    }

    router.replace({
      parameters: { search: undefined, tag },
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
          parameters: { search: input, tag },
        });

        return;
      }

      router.replace({
        parameters: { search: undefined, tag },
      });
    }
  };

  const handleClear = () => {
    debouncedSearch('');
    setInput('');
  };

  useEffect(() => {
    if (!isPostFetching && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isPostFetching]);

  return (
    <div className="flex space-x-4">
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
      <Select>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="frontend">Frontend</SelectItem>
          <SelectItem value="backend">Backend</SelectItem>
          <SelectItem value="devops">DevOps</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PostSearchBox;
