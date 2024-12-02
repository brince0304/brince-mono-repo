import { screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, type Mock } from 'vitest';
import { toast } from 'sonner';
import { postService } from '@/services/post';
import LikeButton from '../LikeButton/LikeButton';
import { ActionButtons } from '../Comments/ActionButtons';
import { renderWithQuery } from '@/test/testUtils';

// Mock 설정


vi.mock('@/services/post', () => ({
  postService: {
    postLikePage: vi.fn(),
  },
}));

describe('Like 기능 통합 테스트', () => {
  describe('LikeButton 컴포넌트', () => {
    it('좋아요 버튼 클릭 시 성공적으로 처리되어야 함', async () => {
      (postService.postLikePage as Mock).mockResolvedValueOnce({});

      renderWithQuery(
        <LikeButton
          pageId="test-page"
          count={0}
          isLiked={false}
        />
      );

      const likeButton = screen.getByRole('button');
      fireEvent.click(likeButton);

      await waitFor(() => {
        expect(postService.postLikePage).toHaveBeenCalledWith({
          pageId: 'test-page',
          count: 0,
        });
        expect(toast.success).toHaveBeenCalledWith("좋아요를 눌렀어요 😊");
      });
    });

    it('이미 좋아요한 게시물 클릭 시 에러 메시지 표시', async () => {
      renderWithQuery(
        <LikeButton
          pageId="test-page"
          count={1}
          isLiked={true}
        />
      );

      const likeButton = screen.getByRole('button');
      fireEvent.click(likeButton);

      expect(toast.error).toHaveBeenCalledWith("이미 좋아요를 누르셨어요 😊");
      expect(postService.postLikePage).not.toHaveBeenCalled();
    });
  });

  describe('ActionButtons 컴포넌트', () => {
    it('공유 버튼 클릭 시 클립보드에 복사되어야 함', async () => {
      const mockClipboard = {
        writeText: vi.fn().mockResolvedValueOnce(undefined),
      };
      Object.assign(navigator, {
        clipboard: mockClipboard,
      });

      renderWithQuery(
        <ActionButtons
          pageId="test-page"
          likeCount={0}
          isLiked={false}
        />
      );

      const shareButton = screen.getByLabelText('복사');
      fireEvent.click(shareButton);

      await waitFor(() => {
        expect(navigator.clipboard.writeText).toHaveBeenCalled();
        expect(toast.success).toHaveBeenCalledWith("포스트 링크가 클립보드에 복사됐어요 🤗");
      });
    });

    it('좋아요 API 호출 실패 시 에러 메시지 표시', async () => {
      (postService.postLikePage as Mock).mockRejectedValueOnce(new Error('API Error'));

      renderWithQuery(
        <ActionButtons
          pageId="test-page"
          likeCount={0}
          isLiked={false}
        />
      );

      const likeButton = screen.getByLabelText('좋아요');
      fireEvent.click(likeButton);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("이미 좋아요를 누르셨어요 😊");
      });
    });
  });
}); 
