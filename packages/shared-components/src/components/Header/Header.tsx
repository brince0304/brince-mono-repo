"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
import { Button } from "../ui/Button/button";
import Logo from "../ui/Logo/Logo";
import { Sheet, SheetContent, SheetTrigger } from "../ui/Sheet/sheet";

interface HeaderProps {
	menuItems: { name: string; path: string }[];
	themeToggle: React.ReactNode;
}

export function Header({ menuItems, themeToggle }: HeaderProps) {
	const pathname = usePathname();

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 max-w-6xl mx-auto items-center justify-between px-4 sm:px-6 lg:px-8">
				<Logo className="mr-6 h-6 w-auto" />
				<nav className="flex items-center space-x-6 text-sm font-medium hidden md:flex-1 md:flex md:space-x-4 justify-center">
					{menuItems.map((item) => (
						<Link
							key={item.path}
							href={item.path}
							className={`transition-colors hover:text-foreground/80 ${
								pathname === item.path
									? "text-foreground"
									: "text-foreground/60"
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
}: { menuItems: { name: string; path: string }[] }) {
	const pathname = usePathname();

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="md:hidden">
					<Menu className="h-5 w-5" />
					<span className="sr-only">Toggle menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="right">
				<nav className="flex flex-col space-y-4 justify-center h-full">
					{menuItems.map((item) => (
						<Link
							key={item.path}
							href={item.path}
							className={`text-sm font-medium transition-colors hover:text-primary ${
								pathname === item.path
									? "text-foreground"
									: "text-foreground/60"
							}`}
						>
							{item.name}
						</Link>
					))}
				</nav>
			</SheetContent>
		</Sheet>
	);
}

export default Header;
