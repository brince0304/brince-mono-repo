'use client';

import { LinkButton } from '@brince-mono-repo/shared-components';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <LinkButton onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? '🌙' : '🌞'}
    </LinkButton>
  );
};

export default dynamic(() => Promise.resolve(ThemeToggle), { ssr: false });
