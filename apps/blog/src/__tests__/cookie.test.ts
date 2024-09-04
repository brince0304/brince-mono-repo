import { getPostLikeStatus, savePostLikeStatus } from "@/lib/cookie";
import { cookies } from "next/headers";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/headers", () => ({
	cookies: vi.fn(),
}));

describe("게시물 좋아요 상태 모듈", () => {
	let mockCookieStore: {
		get: ReturnType<typeof vi.fn>;
		set: ReturnType<typeof vi.fn>;
	};

	beforeEach(() => {
		mockCookieStore = {
			get: vi.fn(),
			set: vi.fn(),
		};
		(cookies as ReturnType<typeof vi.fn>).mockReturnValue(mockCookieStore);
	});

	describe("getPostLikeStatus 함수", () => {
		it("좋아요한 게시물 쿠키가 없을 때 false를 반환해야 함", async () => {
			mockCookieStore.get.mockReturnValue(undefined);
			const result = await getPostLikeStatus("page1");
			expect(result).toBe(false);
		});

		it("게시물이 좋아요 목록에 있을 때 true를 반환해야 함", async () => {
			mockCookieStore.get.mockReturnValue({ value: '["page1","page2"]' });
			const result = await getPostLikeStatus("page1");
			expect(result).toBe(true);
		});

		it("게시물이 좋아요 목록에 없을 때 false를 반환해야 함", async () => {
			mockCookieStore.get.mockReturnValue({ value: '["page2","page3"]' });
			const result = await getPostLikeStatus("page1");
			expect(result).toBe(false);
		});

		it("쿠키의 JSON이 유효하지 않을 때 false를 반환해야 함", async () => {
			mockCookieStore.get.mockReturnValue({ value: "invalid json" });
			const result = await getPostLikeStatus("page1");
			expect(result).toBe(false);
		});
	});

	describe("savePostLikeStatus 함수", () => {
		it("좋아요 시 게시물을 목록에 추가해야 함", async () => {
			mockCookieStore.get.mockReturnValue({ value: '["page2"]' });
			await savePostLikeStatus("page1", true);
			expect(mockCookieStore.set).toHaveBeenCalledWith(
				"likedPosts",
				'["page2","page1"]',
				expect.any(Object),
			);
		});

		it("좋아요 취소 시 게시물을 목록에서 제거해야 함", async () => {
			mockCookieStore.get.mockReturnValue({ value: '["page1","page2"]' });
			await savePostLikeStatus("page1", false);
			expect(mockCookieStore.set).toHaveBeenCalledWith(
				"likedPosts",
				'["page2"]',
				expect.any(Object),
			);
		});

		it("이미 좋아요한 게시물을 다시 좋아요 할 때 목록을 변경하지 않아야 함", async () => {
			mockCookieStore.get.mockReturnValue({ value: '["page1","page2"]' });
			await savePostLikeStatus("page1", true);
			expect(mockCookieStore.set).toHaveBeenCalledWith(
				"likedPosts",
				'["page1","page2"]',
				expect.any(Object),
			);
		});

		it("좋아요 목록이 비어있을 때 새로운 게시물을 추가해야 함", async () => {
			mockCookieStore.get.mockReturnValue(undefined);
			await savePostLikeStatus("page1", true);
			expect(mockCookieStore.set).toHaveBeenCalledWith(
				"likedPosts",
				'["page1"]',
				expect.any(Object),
			);
		});

		it("쿠키의 JSON이 유효하지 않을 때 새로운 목록을 생성해야 함", async () => {
			mockCookieStore.get.mockReturnValue({ value: "invalid json" });
			await savePostLikeStatus("page1", true);
			expect(mockCookieStore.set).toHaveBeenCalledWith(
				"likedPosts",
				'["page1"]',
				expect.any(Object),
			);
		});
	});
});
