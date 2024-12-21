import { CommentQueryOptions } from '@/hooks/comment';
import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from '@repo/ui/ui/button';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@repo/ui/ui/drawer';
import { Typography } from '@repo/ui/ui/typography';
import { useQuery } from '@tanstack/react-query';
import { MessageCircle } from 'lucide-react';
import Comments from './Comments';

interface CommentDrawerTriggerProps {
  pageId: string;
  pageTitle: string;
}

const CommentDrawerTrigger = ({
  pageId,
  pageTitle,
  className,
  ...props
}: CommentDrawerTriggerProps & ButtonProps) => {
  const { data: comments } = useQuery(CommentQueryOptions.getComments(pageId));

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          aria-label="댓글 조회 버튼"
          className={cn('w-12 h-12 rounded-full justify-center relative', className)}
          size="icon"
          {...props}
        >
          <MessageCircle />
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className="h-[70vh] overflow-hidden rounded-t-[10px]"
        aria-description="댓글 목록"
      >
        <div className="h-full overflow-y-auto p-4">
          <DrawerTitle>
            <div className="flex items-center">
              <Typography variant={'large'} className="pb-2 w-auto font-bold">
                댓글 {`${comments?.length ?? ''}개`}
              </Typography>
            </div>
          </DrawerTitle>
          <Comments pageId={pageId} pageTitle={pageTitle} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CommentDrawerTrigger;
