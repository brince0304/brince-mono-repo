import { notionClient } from '@/lib/notion/notion';
import type { GetPostRequest } from '@/models/post';
import { type NextRequest, NextResponse } from 'next/server';

function getParameters(params: URLSearchParams) {
  return {
    pageSize: Number(params.get('pageSize') || 5),
    start_cursor: params.get('start_cursor') || undefined,
    sort: params.get('sort') || ('descending' as 'descending' | 'ascending'),
    sortBy: params.get('sortBy') || ('Date' as 'Date' | 'Likes'),
    search: params.get('search') || '',
    tag: params.get('tag') || '',
    category: params.get('category') || '',
    series: params.get('series') || '',
  };
}
export async function GET(request: NextRequest) {
  const url = request.nextUrl;

  if (!url) {
    return NextResponse.json({ error: 'URL이 존재하지 않습니다.' }, { status: 400 });
  }

  const params = url.searchParams;
  const parameters = getParameters(params);

  try {
    const response = await notionClient.getPostsByParams(parameters as GetPostRequest);
    
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: '게시글 조회에 실패하였습니다.', errorMessage: error },
      { status: 500 }
    );
  }
}
