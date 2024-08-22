'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import ButtonLink from '@/components/common/LinkButton/LinkButton';

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
    <ButtonLink onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? '🌙' : '🌞'}
    </ButtonLink>
  );
};

export default dynamic(() => Promise.resolve(ThemeToggle), { ssr: false });
