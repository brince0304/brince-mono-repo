import { getPostLikeStatus, savePostLikeStatus } from '@/lib/cookie';
import { notionClient } from '@/lib/notion/notion';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {


  try {
    const data = await req.json();
    const { pageId, count } = data;

    if (!pageId) {
      return NextResponse.json(
        { error: '페이지 ID 나 요청값이 존재하지 않습니다.' },
        { status: 400 }
      );
    }

    await Promise.all([
      notionClient.updatePostLike(pageId, count + 1),
      savePostLikeStatus(pageId, true),
    ]);

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error('Error post Like:', error);
    return NextResponse.json({ error: '좋아요에 실패하였습니다.' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    // URL에서 pageId 추출
    const url = new URL(req.url);
    const pageId = url.searchParams.get('pageId');

    if (!pageId) {
      return NextResponse.json(
        { error: '페이지 ID 나 요청값이 존재하지 않습니다.' },
        { status: 400 }
      );
    }

    const isLiked = await getPostLikeStatus(pageId);
    const likeCount = await notionClient.getPostLikeCount(pageId);

    return NextResponse.json({ isLiked, likeCount });
  } catch (error) {
    console.error('Error post Like:', error);
    return NextResponse.json({ error: '좋아요에 실패하였습니다.' }, { status: 500 });
  }
}
