import { Skeleton } from '../ui/skeleton';

const PostSkeleton = () => {
  return (
    <div className="flex gap-6 p-2 sm:p-4 rounded-lg">
      {/* 이미지 영역 */}
      <div className="flex-shrink-0 w-20 h-20 sm:w-32 sm:h-32 overflow-hidden rounded-md">
        <Skeleton className="w-full h-full" />
      </div>

      {/* 컨텐츠 영역 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 제목 */}
        <div className="mb-2">
          <Skeleton className="h-6 w-3/4" />
        </div>

        {/* 본문 미리보기 */}
        <div className="mb-auto space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* 메타 정보 */}
        <div className="flex flex-col gap-3 mt-3">
          {/* 태그 영역 */}
          <div className="flex flex-wrap gap-1.5">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>

          {/* 날짜와 상호작용 */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-20" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PostSkeleton };
