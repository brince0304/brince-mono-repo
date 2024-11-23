'use client';

import type { ComponentType, FC, SVGProps } from 'react';
import { Typography } from './ui/typography';

export interface TextGridProps {
  title: string;
  description: string;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

const TextGrid: FC<TextGridProps> = ({ title, description, Icon }) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-2">
      {Icon && <div className="w-8 h-8 text-blue-500 dark:text-blue-400">{<Icon />}</div>}
      <Typography variant="h2" className="font-bold">
        {title}
      </Typography>
    </div>
    <Typography variant="p" className={'text-muted-foreground'}>
      {description}
    </Typography>
  </div>
);

export { TextGrid };
