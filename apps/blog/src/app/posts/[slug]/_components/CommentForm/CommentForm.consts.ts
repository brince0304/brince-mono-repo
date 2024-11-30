import { z } from 'zod';

export const COMMENT_SUBMIT_MESSAGES = {
  REPLY: {
    loading: '답글을 등록 중입니다 🚀',
    success: '답글이 등록되었습니다 🎉',
  },
  COMMENT: {
    loading: '댓글을 등록 중입니다 🚀',
    success: '댓글이 등록되었습니다 🎉',
  },
  error: '댓글 등록에 실패하였습니다 😢',
} as const;

export const commentFormSchema = z.object({
  text: z.string().min(2, '댓글은 2자 이상 입력해주세요').max(200, '댓글은 200자 이하로 입력해주세요 😉').default(''),
  author: z.string().max(6, '닉네임은 6자 이하로 입력해주세요').default('익명'),
  avatar: z.string().optional(),
});
