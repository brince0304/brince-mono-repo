import { notionClient } from '@/lib/notion/notion';
import type { NotionProperties } from '@/models/notion';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const pageId = searchParams.get('pageId');

    if (!pageId) {
      return NextResponse.json({ error: '페이지 ID가 존재하지 않습니다.' }, { status: 400 });
    }

    const response = await notionClient.getComments(pageId);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: '댓글 조회에 실패하였습니다.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { pageId, data, parentId } = await request.json();

  if (!pageId || !data) {
    return NextResponse.json(
      { error: '페이지 ID 나 요청값이 존재하지 않습니다.' },
      { status: 400 }
    );
  }

  try {
    if (parentId) {
      data.parentId = parentId;
    }

    const [_, comments] = await Promise.all([
      notionClient.createCommentPage(pageId, data),
      notionClient.getComments(pageId),
    ]);

    await notionClient.updatePostProperties(pageId, <NotionProperties>{
      Comments: {
        type: 'number',
        number: comments.length + 1,
      },
    });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error('Error posting comment:', error);
    return NextResponse.json({ error: '댓글 등록에 실패하였습니다.' }, { status: 500 });
  }
}
