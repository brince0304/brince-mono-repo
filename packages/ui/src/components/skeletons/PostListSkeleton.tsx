import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const VerticalPostCardSkeleton = () => {
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

const HorizontalPostCardSkeleton = () => {
  return (
    <Card className="overflow-hidden flex flex-row h-48 w-full mx-auto">
      <div className="w-1/3 relative">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="w-2/3 flex flex-col">
        <CardContent className="p-5 flex-grow flex flex-col">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/4 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-4" />
          <div className="flex space-x-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center px-5 py-3 bg-muted/50">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-8" />
          </div>
          <Skeleton className="h-8 w-24" />
        </CardFooter>
      </div>
    </Card>
  );
};

const PostListSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="block sm:hidden flex flex-col gap-4">
        <VerticalPostCardSkeleton />
        <VerticalPostCardSkeleton />
        <VerticalPostCardSkeleton />
      </div>

      <div className="hidden sm:flex flex-col gap-4">
        <HorizontalPostCardSkeleton />
        <HorizontalPostCardSkeleton />
        <HorizontalPostCardSkeleton />
      </div>
    </div>
  );
};

export { PostListSkeleton };
