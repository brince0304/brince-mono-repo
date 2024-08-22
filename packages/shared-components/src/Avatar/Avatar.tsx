'use client';

import type React from 'react';
import { useMemo } from 'react';

interface AvatarProps {
  className?: string;
  size?: number;
  owner?: boolean;
  liked?: boolean;
}

const HeartIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF0000">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const Avatar: React.FC<AvatarProps> = ({ size = 40, className = '', liked, owner }) => {
  const styles = ['adventurer', 'avataaars', 'bottts', 'personas'];

  const randomStyle = useMemo(() => styles[Math.floor(Math.random() * styles.length)], []);
  const randomSeed = useMemo(() => Math.random().toString(36).substring(7), []);

  const avatarUrl = `https://api.dicebear.com/6.x/${randomStyle}/svg?seed=${randomSeed}`;
  const targetUrl = owner ? 'https://api.dicebear.com/9.x/big-smile/svg?seed=Gizmo' : avatarUrl;

  const mergedClassName = `rounded-full ${className}`;

  return (
    <div className="relative inline-block">
      <img
        src={targetUrl}
        alt={'random avatar'}
        width={size}
        height={size}
        className={mergedClassName}
      />
      {liked && (
        <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5">
          <HeartIcon size={16} />
        </div>
      )}
    </div>
  );
};

export default Avatar;
