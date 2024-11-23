'use client';

import { Input } from '@repo/ui/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/ui/select';
import PostTags from './PostTags';
import { useIsFetching } from '@tanstack/react-query';
import { PostQueryKeys } from '@/hooks/post';

const PostListHeader = () => {
  const isPostFetching = useIsFetching({
    queryKey: PostQueryKeys.GET_POSTS,
  });

  console.log(isPostFetching);

  return (
    <div className="sticky top-[56px] z-10 backdrop-blur-sm py-4 border-b border-border bg-background flex flex-col gap-4">
      <div className="flex space-x-4">
        <div className="flex-grow">
          <Input
            type="text"
            placeholder="검색어를 입력해주세요."
            inputMode="search"
            autoComplete="off"
            className="resize-none"
            isLoading={isPostFetching > 0}
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

      <div className="flex space-x-2">
        <PostTags isFetchingPost={isPostFetching > 0} />
      </div>
    </div>
  );
};

export default PostListHeader;
