'use client';

import { ArrowRight, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type * as React from 'react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface HeaderProps {
  menuItems: { name: string; path: string }[];
  themeToggle: React.ReactNode;
}

function Header({ menuItems, themeToggle }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-6xl mx-auto items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={'/'}>
          <div className="flex items-center justify-center bg-transparent">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              BRIN
              <span className="text-blue-500 dark:text-blue-400">&lt;/&gt;</span>E
            </h1>
          </div>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium hidden md:flex-1 md:flex md:space-x-4 justify-center">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`transition-colors hover:text-foreground/80 ${
                pathname === item.path ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            {themeToggle}
            <MobileNav menuItems={menuItems} />
          </nav>
        </div>
      </div>
    </header>
  );
}

function MobileNav({
  menuItems,
}: { menuItems: { name: string; path: string; icon?: React.ReactNode }[] }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col space-y-4 mt-8">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center p-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/60 hover:bg-accent hover:text-accent-foreground'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span className="text-lg font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export { Header };
