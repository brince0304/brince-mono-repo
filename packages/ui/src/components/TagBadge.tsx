'use client';

import type { FC } from 'react';
import { Badge } from './ui/badge';
import { Tag } from 'lucide-react';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export interface TagProps {
  tag: string;
  useTooltip?: boolean;
}

const TagBadge: FC<TagProps> = ({ tag, useTooltip = true }) => {
  return (
    <Link href={`/posts?tag=${tag}`}>
      <TooltipProvider delayDuration={100}>
        {useTooltip ? (
          <Tooltip>
            <TooltipTrigger>
              <Badge variant="secondary" key={tag}>
                <Tag className="mr-1 h-4 w-4" />
                {tag}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>{`${tag} 관련 포스트를 확인해보세요 👋🏻`}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Badge variant="secondary" key={tag}>
            <Tag className="mr-1 h-4 w-4" />
            {tag}
          </Badge>
        )}
      </TooltipProvider>
    </Link>
  );
};

export { TagBadge };
