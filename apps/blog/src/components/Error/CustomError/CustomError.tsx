import { Button } from '@repo/ui/ui/button';
import { Typography } from '@repo/ui/ui/typography';
import type React from 'react';

interface CustomErrorProps {
  code: number;
  message: string;
  emoji?: string;
  onClick?: () => void;
}

const CustomError: React.FC<CustomErrorProps> = ({
  code,
  message,
  emoji = '🤔',
  onClick = () => {},
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-gray-900 dark:text-white gap-4 pt-16">
      <Typography variant={'h2'} className="font-semibold">
        {code}
      </Typography>
      <Typography variant={'h3'}>{message}</Typography>
      <div className="w-16 h-16 rounded-full bg-yellow-400 dark:bg-yellow-300 flex items-center justify-center mb-8">
        <span className="text-3xl">{emoji}</span>
      </div>
      <Button size={'lg'} onClick={onClick}>
        돌아가기
      </Button>
    </div>
  );
};

export default CustomError;
