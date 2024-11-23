'use client';

import type { FC } from 'react';
import { Badge } from './ui/badge';
import { Check, Tag } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { twMerge } from 'tailwind-merge';

export interface TagProps {
  tag: string;
  useTooltip?: boolean;
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const TagBadge: FC<TagProps> = ({ tag, useTooltip = true, className, isActive, onClick }) => {
  const combinedClassName = twMerge(
    'cursor-pointer',
    className,
    isActive
      ? 'bg-primary text-primary-foreground hover:bg-primary/80'
      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
  );

  const TagIcon = isActive ? Check : Tag;

  const BadgeContent = (
    <Badge onClick={onClick} variant="secondary" className={combinedClassName} key={tag}>
      <TagIcon className="mr-1 h-4 w-4" />
      {tag}
    </Badge>
  );

  const TagContent = useTooltip ? (
    <Tooltip>
      <TooltipTrigger>{BadgeContent}</TooltipTrigger>
      <TooltipContent>
        <p>{`${tag} 관련 포스트를 확인해보세요 👋🏻`}</p>
      </TooltipContent>
    </Tooltip>
  ) : (
    BadgeContent
  );

  return <TooltipProvider delayDuration={100}>{TagContent}</TooltipProvider>;
};

export { TagBadge };
