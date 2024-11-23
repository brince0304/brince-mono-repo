import { Button } from '@repo/ui/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@repo/ui/ui/card';
import { Input } from '@repo/ui/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/ui/select';
import { LayoutList, LayoutGrid } from 'lucide-react';
import { TextGrid } from '@repo/ui/TextGrid';

import PostTags from './_components/PostTags/PostTags';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function Post() {
  return (
    <div>
      <TextGrid title="Posts" description="최신 블로그 포스트를 확인해보세요 🔖" />
      <div className="flex mb-6 space-x-4">
        <div className="flex-grow">
          <Input type="text" placeholder="Search posts..." />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="frontend">Frontend</SelectItem>
            <SelectItem value="backend">Backend</SelectItem>
            <SelectItem value="devops">DevOps</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex mb-6 space-x-2">
        <PostTags />
      </div>

      <div className="flex justify-end mb-4 space-x-2">
        <Button variant="outline" size="icon">
          <LayoutList className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <LayoutGrid className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((post) => (
          <Card key={post}>
            <CardHeader>
              <CardTitle>Blog Post Title</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Short description of the blog post...</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <span className="text-sm text-muted-foreground">2024년 10월 3일</span>
              <Button variant="link">Read more →</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex justify-center space-x-2">
        <Button variant="outline" size="sm">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="outline" size="sm">
          ...
        </Button>
      </div>
    </div>
  );
}
