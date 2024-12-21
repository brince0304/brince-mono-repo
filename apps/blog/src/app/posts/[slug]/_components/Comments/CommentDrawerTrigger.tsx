import { Drawer, DrawerContent, DrawerTrigger } from '@repo/ui/ui/drawer';
import { Button, type ButtonProps } from '@repo/ui/ui/button';
import { MessageCircle } from 'lucide-react';
import Comments from './Comments';
import { cn } from '@/lib/utils';

interface CommentDrawerTriggerProps {
  pageId: string;
  pageTitle: string;
}

const CommentDrawerTrigger = ({ pageId, pageTitle, className, ...props }: CommentDrawerTriggerProps & ButtonProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          aria-label="댓글 조회 버튼"
          className={cn("w-12 h-12 rounded-full justify-center relative", className)}
          size="icon"
          {...props}
        >
          <MessageCircle />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[70vh] overflow-hidden rounded-t-[10px]">
        <div className="h-full overflow-y-auto p-4">
          <Comments pageId={pageId} pageTitle={pageTitle} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default CommentDrawerTrigger;
