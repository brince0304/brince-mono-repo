import { type NextRequest, NextResponse } from 'next/server';
import { notionClient } from '@/lib/notion/notion';
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug;

  if (!slug) {
    return NextResponse.json({ error: '페이지 ID가 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    const response = await notionClient.getPageBySlug(slug);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: '게시글 조회에 실패하였습니다.' }, { status: 500 });
  }
}
