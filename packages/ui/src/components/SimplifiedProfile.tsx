'use client';

import React from 'react';
import { BrinceAvatar } from './BrinceAvatar';
import { Card, CardContent } from './ui/card';
import { BLOG_OWNER, BLOG_OWNER_JOB, GITHUB_URL, LINKEDIN_URL } from '../lib/constants';
import { GithubIcon, LinkedinIcon } from 'lucide-react';

const SimplifiedProfile = () => {
  return (
    <Card className="w-full">
      <CardContent className="flex items-center space-x-4 p-4">
        <BrinceAvatar className="h-12 w-12" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
            {BLOG_OWNER}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{BLOG_OWNER_JOB}</p>
        </div>
        <div className="flex space-x-2 gap-2">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-300"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-300"
          >
            <LinkedinIcon size={20} />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export { SimplifiedProfile };
