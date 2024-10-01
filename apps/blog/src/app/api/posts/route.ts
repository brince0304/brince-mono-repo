import { NextResponse } from 'next/server';
import { notionClient } from '@/lib/notion/notion';

export async function GET() {
  try {
    const response = await notionClient.getPosts();
    const wrappedResponse = NextResponse.json(response);

    wrappedResponse.headers.set('Cache-Control', 'public, max-age=60, s-maxage=60');

    return wrappedResponse;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: '게시글 조회에 실패하였습니다.' }, { status: 500 });
  }
}
