'use client';

import Link from 'next/link';
import { BrinceAvatar } from '@repo/ui/components/BrinceAvatar';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import { GithubIcon, LinkedinIcon } from 'lucide-react';
import { BLOG_OWNER, BLOG_OWNER_JOB, GITHUB_URL, LINKEDIN_URL } from '@repo/ui/libs/constants';

const SimplifiedProfileCard = () => {
  return (
    <Card className="w-full mt-4">
      <CardContent className="flex items-center space-x-4 p-4">
        <BrinceAvatar className="h-12 w-12" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
            {BLOG_OWNER}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{BLOG_OWNER_JOB}</p>
        </div>
        <div className="flex space-x-2 gap-2">
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-300"
            title={`${BLOG_OWNER} Github 바로가기`}
          >
            <GithubIcon size={20} />
          </Link>
          <Link
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-300"
            title={`${BLOG_OWNER} LinkedIn 바로가기`}
          >
            <LinkedinIcon size={20} />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export { SimplifiedProfileCard };
