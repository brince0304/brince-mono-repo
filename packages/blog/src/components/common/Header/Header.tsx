'use client';
import ButtonLink from '@/components/common/LinkButton/LinkButton';
import Logo from '@/components/common/Logo/Logo';
import { usePathname } from 'next/navigation';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

interface HeaderProps {
  menuItems: { name: string; path: string }[];
}

const ThemeToggle = dynamic(() => import('@/components/common/ThemeToggle/ThemeToggle'), {
  ssr: false,
});

const Header: React.FC<HeaderProps> = ({ menuItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Logo className="h-8 w-auto" />
          </div>

          <nav className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <ButtonLink
                key={item.path}
                href={item.path}
                isActive={pathname === item.path}
                className={pathname === item.path ? 'text-purple-600 dark:text-purple-400' : ''}
              >
                {item.name}
              </ButtonLink>
            ))}
          </nav>

          <div className="flex items-center">
            <ThemeToggle />
            <ButtonLink
              onClick={toggleMenu}
              className="md:hidden ml-4 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className={`fixed inset-y-0 right-0 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-5">
          <ButtonLink
            onClick={toggleMenu}
            className="absolute top-4 right-4 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            aria-label="Close menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </ButtonLink>
          <nav className="mt-12 space-y-4">
            {menuItems.map((item) => (
              <ButtonLink
                key={item.path}
                href={item.path}
                isActive={pathname === item.path}
                fullWidth
                className={`block ${pathname === item.path ? 'text-purple-600 dark:text-purple-400' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </ButtonLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
