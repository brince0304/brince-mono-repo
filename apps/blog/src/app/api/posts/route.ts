import { notionClient } from '@/lib/notion/notion';
import type { NotionPagesResponse } from '@/models/notion';
import type { GetPostRequest } from '@/models/post';
import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

function getParameters(params: URLSearchParams) {
  return {
    page: Number(params.get('page') || 1),
    pageSize: Number(params.get('pageSize') || 5),
    sort: params.get('sort') || ('descending' as 'descending' | 'ascending'),
    sortBy: params.get('sortBy') || ('Date' as 'Date' | 'Likes'),
    filter: params.get('filter') || {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    },
  };
}

async function getResponse(parameters: GetPostRequest) {
  if (Object.keys(parameters).length === 0) {
    return await notionClient.getPosts();
  }

  return await notionClient.getPostsByParams(parameters);
}

function createWrappedResponse(response: NotionPagesResponse | undefined) {
  const wrappedResponse = NextResponse.json(response);
  wrappedResponse.headers.set('Cache-Control', 'public, max-age=60, s-maxage=60');
  revalidatePath('/api/posts');

  return wrappedResponse;
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl;

  if (!url) {
    return NextResponse.json({ error: 'URL이 존재하지 않습니다.' }, { status: 400 });
  }

  const params = url.searchParams;
  const parameters = getParameters(params);

  try {
    const response = await getResponse(parameters as GetPostRequest);
    return createWrappedResponse(response);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: '게시글 조회에 실패하였습니다.', errorMessage: error },
      { status: 500 }
    );
  }
}
