import { notionClient } from '@/lib/notion/notion';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(_: NextRequest) {
  try {
    const response = await notionClient.getAllCategories();

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('카테고리를 가져오는 중 오류 발생:', error);

    return NextResponse.json(
      { error: '카테고리를 가져오는 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
