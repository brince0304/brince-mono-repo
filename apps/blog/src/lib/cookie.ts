import { cookies } from 'next/headers';

const LIKED_POSTS_COOKIE_NAME = 'likedPosts';

interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'strict' | 'lax' | 'none';
  maxAge: number;
}

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 30 * 24 * 60 * 60, // 30일
};

const parseLikedPosts = (cookieValue: string | undefined): string[] => {
  if (!cookieValue) return [];

  try {
    const parsed = JSON.parse(cookieValue);
    if (Array.isArray(parsed)) return parsed;
    throw new Error('Invalid cookie value');
  } catch (error) {
    console.error('쿠키 파싱 중 오류 발생:', error);
    return [];
  }
};

export const getPostLikeStatus = async (pageId: string): Promise<boolean> => {
  const cookieStore = cookies();
  const likedPostsCookie = cookieStore.get(LIKED_POSTS_COOKIE_NAME);
  const likedPosts = parseLikedPosts(likedPostsCookie?.value);
  return likedPosts.includes(pageId);
};

export const savePostLikeStatus = async (pageId: string, isLiked: boolean): Promise<void> => {
  const cookieStore = cookies();
  const likedPostsCookie = cookieStore.get(LIKED_POSTS_COOKIE_NAME);
  const likedPosts = parseLikedPosts(likedPostsCookie?.value);

  const pageIndex = likedPosts.indexOf(pageId);
  if (isLiked && pageIndex === -1) {
    likedPosts.push(pageId);
  } else if (!isLiked && pageIndex !== -1) {
    likedPosts.splice(pageIndex, 1);
  }

  cookieStore.set(LIKED_POSTS_COOKIE_NAME, JSON.stringify(likedPosts), cookieOptions);
};
