'use client';

import { GithubIcon, Mail } from 'lucide-react';
import { BrinceAvatar } from './BrinceAvatar';
import {
  BLOG_OWNER,
  BLOG_OWNER_JOB_DESCRIPTION,
  EMAIL_URL,
  GITHUB_URL,
  LINKEDIN_URL,
} from '../lib/constants';
import { LinkedInLogoIcon } from '@radix-ui/react-icons';
import { Typography } from './ui/typography';

const ProfileCard = () => {
  return (
    <div className="w-full bg-card rounded-xl p-6 border border-border">
      <div className="flex flex-col md:flex-row gap-6">
        {/* 프로필 이미지 섹션 */}
        <div className="relative">
          <BrinceAvatar className="w-24 h-24 shadow-lg border-2 border-primary" />
          <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full md:hidden">
            Frontend
          </div>
        </div>

        {/* 정보 섹션 */}
        <div className="flex flex-col flex-1 gap-4">
          <div>
            <Typography variant="h3" className="text-2xl font-bold flex items-center gap-2">
              {BLOG_OWNER}
              <span className="text-primary">💻</span>
            </Typography>
            <Typography variant="p" className="text-muted-foreground mt-1">
              {BLOG_OWNER_JOB_DESCRIPTION}
            </Typography>
          </div>

          {/* 소셜 링크 */}
          <div className="flex gap-4">
            <a href={GITHUB_URL} className="text-muted-foreground hover:text-primary transition-colors">
              <GithubIcon className="w-5 h-5" />
            </a>
            <a href={LINKEDIN_URL} className="text-muted-foreground hover:text-primary transition-colors">
              <LinkedInLogoIcon className="w-5 h-5" />
            </a>
            <a href={EMAIL_URL} className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProfileCard };
