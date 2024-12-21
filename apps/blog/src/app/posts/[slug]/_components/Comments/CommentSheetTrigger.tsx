import { Sheet, SheetContent, SheetTrigger } from '@repo/ui/ui/sheet'
import Comments from './Comments';
import { Button } from '@repo/ui/ui/button';
import { MessageCircle } from 'lucide-react';

interface CommentSheetProps {
  pageId: string;
  pageTitle: string;
}

const CommentSheetTrigger = ({ pageId, pageTitle }: CommentSheetProps) => {
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
      <SheetContent className="overflow-y-auto">
        <Comments pageId={pageId} pageTitle={pageTitle} />
      </SheetContent>
    </Sheet>
  )
}

export default CommentSheetTrigger
