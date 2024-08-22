import { notionClient } from '@/lib/notion';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await notionClient.getPosts();

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: '게시글 조회에 실패하였습니다.' }, { status: 500 });
  }
}
