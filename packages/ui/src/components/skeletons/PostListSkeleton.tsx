import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const PostCardSkeleton = () => {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-2">
        <Skeleton className="h-[150px] sm:h-[200px] w-full rounded-lg" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-3 sm:h-4 w-full" />
        <Skeleton className="h-3 sm:h-4 w-3/4" />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Skeleton className="h-3 sm:h-4 w-[30px] sm:w-[40px]" />
        <Skeleton className="h-3 sm:h-4 w-[50px] sm:w-[60px]" />
      </CardFooter>
    </Card>
  );
};

const PostListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <PostCardSkeleton />
      <PostCardSkeleton />
      <PostCardSkeleton />
    </div>
  );
};

export { PostListSkeleton };
