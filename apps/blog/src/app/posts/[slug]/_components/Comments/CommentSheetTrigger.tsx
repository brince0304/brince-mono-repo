import { CommentQueryOptions } from '@/hooks/comment';
import { Button } from '@repo/ui/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@repo/ui/ui/sheet';
import { Typography } from '@repo/ui/ui/typography';
import { useQuery } from '@tanstack/react-query';
import { MessageCircle } from 'lucide-react';
import Comments from './Comments';

interface CommentSheetProps {
  pageId: string;
  pageTitle: string;
}

const CommentSheetTrigger = ({ pageId, pageTitle }: CommentSheetProps) => {
  const { data: comments } = useQuery(CommentQueryOptions.getComments(pageId));

  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          aria-label="댓글 조회 버튼"
          className="w-12 h-12 rounded-full justify-center relative"
          size="icon"
        >
          <MessageCircle />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto" aria-description="댓글 목록">
        <SheetTitle>
          <div className="flex items-center">
            <Typography variant={'large'} className="pb-2 w-auto font-bold">
              댓글 {`${comments?.length ?? ''}개`}
            </Typography>
          </div>
        </SheetTitle>
        <Comments pageId={pageId} pageTitle={pageTitle} />
      </SheetContent>
    </Sheet>
  );
};

export default CommentSheetTrigger;
