import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

const useCopyPostLink = () => {
  const location = usePathname();

  const copyPostLink = useCallback(async () => {
    try {
      const title = document.title;
      const url = `${location}`;
      const textToCopy = `${title}\n${url}`;

      await navigator.clipboard.writeText(textToCopy);
      toast.success('포스트 링크가 클립보드에 복사됐어요 🤗');
    } catch (error) {
      console.error('복사 중 오류 발생:', error);
      toast.error('복사 중 오류가 발생했어요 😢');
    }
  }, [location]);

  return { copyPostLink };
};

export default useCopyPostLink;
