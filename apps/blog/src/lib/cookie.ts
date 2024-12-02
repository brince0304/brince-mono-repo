'use server';

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
  try {
    const likedPosts = parseLikedPosts(cookies().get(LIKED_POSTS_COOKIE_NAME)?.value);
    return likedPosts.includes(pageId);
  } catch (error) {
    console.error('쿠키 접근 중 오류 발생:', error);
    return false;
  }
};

export const savePostLikeStatus = async (pageId: string, isLiked: boolean): Promise<void> => {
  try {
    const cookieStore = cookies();
    const likedPosts = parseLikedPosts(cookieStore.get(LIKED_POSTS_COOKIE_NAME)?.value);

    if (isLiked) {
      if (!likedPosts.includes(pageId)) {
        likedPosts.push(pageId);
      }
    } else {
      const index = likedPosts.indexOf(pageId);
      
      if (index !== -1) {
        likedPosts.splice(index, 1);
      }
    }

    cookieStore.set(LIKED_POSTS_COOKIE_NAME, JSON.stringify(likedPosts), cookieOptions);
  } catch (error) {
    console.error('쿠키 저장 중 오류 발생:', error);
  }
};
