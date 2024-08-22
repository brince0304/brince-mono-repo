import Link from 'next/link';
import type React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <Link
      href={'/'}
      className={
        'transition duration-300 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
      }
    >
      <svg
        className={`h-10 w-auto ${className}`}
        viewBox="0 0 200 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1A365D" />
            <stop offset="100%" stopColor="#4FD1C5" />
          </linearGradient>
        </defs>

        {/* B */}
        <path
          d="M10 10 V50 H30 Q40 50 40 40 V35 Q40 25 30 25 H10 M10 25 H25 Q35 25 35 17.5 V15 Q35 10 25 10 H10"
          stroke="url(#gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* R */}
        <path
          d="M50 10 V50 M50 10 H65 Q75 10 75 20 V25 Q75 35 65 35 H50 M65 35 L80 50"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* I */}
        <path
          d="M90 10 V50 M85 10 H95 M85 50 H95"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* N */}
        <path
          d="M110 50 V10 L140 50 V10"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* C */}
        <path
          d="M180 15 Q160 10 160 30 Q160 50 180 45"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* E */}
        <path
          d="M190 10 H220 M190 30 H215 M190 50 H220 M190 10 V50"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Underline */}
      </svg>
    </Link>
  );
};

export default Logo;
