import type { NotionPage } from "@/models/notion";
import { Button } from "@repo/ui/ui/button";
import { Card, CardContent } from "@repo/ui/ui/card";
import { Typography } from "@repo/ui/ui/typography";
import Link from "next/link";

interface SeriesNavigationProps {
  title: string;
  posts: NotionPage[];
  className?: string;
  currentNumber: number;
}

export function SeriesNavigation({ title, posts, className, currentNumber }: SeriesNavigationProps) {
  const prevPost = posts[currentNumber - 2];
  const nextPost = posts[currentNumber];

  return (
    <Card className={className}>
      <CardContent className="p-4 sm:p-6">
        {/* 시리즈 헤더 */}
        <div className="space-y-2 mb-4 sm:mb-6">
          <Typography variant={"muted"} className="text-sm">시리즈</Typography>
          <Typography variant={"large"}>{title}</Typography>
          <Typography variant={"muted"} className="text-sm">
            {currentNumber} / {posts.length}
          </Typography>
        </div>
        {/* 전체 목록 토글 */}
        <details className="mt-4">
          <summary className="cursor-pointer text-sm text-muted-foreground hover:text-primary transition-colors flex justify-between items-center [&::-webkit-details-marker]:hidden">
            시리즈 전체 보기
            <div className="flex justify-between w-full max-w-[80px]">
              <Button
                variant="outline"
                size="icon"
                disabled={!prevPost}
                asChild={!!prevPost}
                className="rounded-full"
              >
                {prevPost ? (
                  <Link href={`/posts/${prevPost.properties.Slug.rich_text[0]?.plain_text}`}>
                    ←
                  </Link>
                ) : (
                  '←'
                )}
              </Button>

              <Button
                variant="outline"
                size="icon"
                disabled={!nextPost}
                asChild={!!nextPost}
                className="rounded-full"
              >
                {nextPost ? (
                  <Link href={`/posts/${nextPost.properties.Slug.rich_text[0]?.plain_text}`}>
                    →
                  </Link>
                ) : (
                  '→'
                )}
              </Button>
            </div>
          </summary>
          <ul className="mt-2 space-y-2 max-h-[50vh] overflow-y-auto">
            {posts.map((post, index) => (
              <li
                key={post.id}
                className={`text-sm ${index + 1 === currentNumber
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
                  }`}
              >
                <Link
                  href={`/posts/${post.properties.Slug.rich_text[0]?.plain_text}`}
                  className="hover:underline block"
                >
                  {index + 1}. {post.properties.Title.title[0]?.plain_text}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </CardContent>
    </Card>
  );
}
