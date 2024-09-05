'use client';
import type Link from 'next/link';
import type React from 'react';

interface LogoProps {
  className?: string;
  LinkComponent?: typeof Link;
}

const Logo: React.FC<LogoProps> = ({ className = '', LinkComponent = 'a' }) => {
  return (
    <LinkComponent href={'/'}>
      <div className="flex items-center justify-center bg-transparent">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          BRIN
          <span className="text-blue-500 dark:text-blue-400">&lt;/&gt;</span>E
        </h1>
      </div>
    </LinkComponent>
  );
};

export default Logo;
