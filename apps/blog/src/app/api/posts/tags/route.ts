import { notionClient } from '@/lib/notion/notion';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const nextCursor = searchParams.get('nextCursor') ?? undefined;

  try {
    const response = await notionClient.getAllTags(nextCursor);

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('태그를 가져오는 중 오류 발생:', error);

    return NextResponse.json({ error: '태그를 가져오는 중 오류가 발생했습니다' }, { status: 500 });
  }
}
