'use client';

import type { FC } from 'react';
import { Badge, type BadgeProps } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { twMerge } from 'tailwind-merge';

export interface TagProps extends BadgeProps {
  tag: string;
  useTooltip?: boolean;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const TagBadge: FC<TagProps> = ({
  tag,
  useTooltip = true,
  className,
  isActive,
  onClick,
  ...props
}) => {
  const combinedClassName = twMerge(
    'cursor-pointer',
    className,
    isActive
      ? 'bg-primary text-primary-foreground hover:bg-primary/80'
      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
  );

  const BadgeContent = (
    <Badge onClick={onClick} variant="secondary" className={combinedClassName} key={tag} {...props}>
      {tag}
    </Badge>
  );

  const TagContent = useTooltip ? (
    <Tooltip>
      <TooltipTrigger>{BadgeContent}</TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{`${tag} 관련 포스트를 확인해보세요 👋🏻`}</p>
      </TooltipContent>
    </Tooltip>
  ) : (
    BadgeContent
  );

  return <TooltipProvider delayDuration={100}>{TagContent}</TooltipProvider>;
};

export { TagBadge };
