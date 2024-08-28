"use client";
import { LucideHash } from "lucide-react";
import type React from "react";
import { useState } from "react";

type colors =
	| "blue"
	| "green"
	| "red"
	| "yellow"
	| "purple"
	| "gray"
	| "slate"
	| "zinc"
	| "neutral"
	| "stone";
type shapes = "rounded" | "square";
type sizes = "sm" | "md" | "lg";

interface ChipProps {
	text: string;
	color?: colors;
	onClick?: () => void;
	hoverEffect?: boolean;
	icon?: React.ReactNode;
	tag?: boolean;
	shape?: shapes;
	size?: sizes;
}

const Chip = ({
	text,
	color = "blue",
	onClick,
	hoverEffect = true,
	icon,
	tag = false,
	shape = "rounded",
	size = "md",
}: ChipProps) => {
	const [isHovered, setIsHovered] = useState(false);

	const getColorClasses = () => {
		const colorMap = {
			blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
			green:
				"bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
			red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
			yellow:
				"bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
			purple:
				"bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
			gray: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
			slate:
				"bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
			zinc: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
			neutral:
				"bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200",
			stone:
				"bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-200",
		};
		return colorMap[color] || colorMap.blue;
	};

	const getHoverClasses = () => {
		if (!hoverEffect) return "";
		const hoverMap = {
			blue: "hover:bg-blue-200 dark:hover:bg-blue-800",
			green: "hover:bg-green-200 dark:hover:bg-green-800",
			red: "hover:bg-red-200 dark:hover:bg-red-800",
			yellow: "hover:bg-yellow-200 dark:hover:bg-yellow-800",
			purple: "hover:bg-purple-200 dark:hover:bg-purple-800",
			gray: "hover:bg-gray-200 dark:hover:bg-gray-700",
			slate: "hover:bg-slate-200 dark:hover:bg-slate-700",
			zinc: "hover:bg-zinc-200 dark:hover:bg-zinc-700",
			neutral: "hover:bg-neutral-200 dark:hover:bg-neutral-700",
			stone: "hover:bg-stone-200 dark:hover:bg-stone-700",
		};
		return hoverMap[color] || hoverMap.blue;
	};

	const getShapeClasses = () => {
		return shape === "rounded" ? "rounded-full" : "rounded-md";
	};

	const getSizeClasses = () => {
		const sizeMap = {
			sm: "px-2 py-1 text-xs",
			md: "px-3 py-1.5 text-sm",
			lg: "px-4 py-2 text-base",
		};
		return sizeMap[size] || sizeMap.md;
	};

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<span
			className={`inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium transition-all duration-200
			 ease-in-out ${getColorClasses()} ${getHoverClasses()} ${getShapeClasses()} ${
					isHovered ? "shadow-md" : ""
				} ${onClick ? "cursor-pointer" : ""} ${getSizeClasses()}`}
			onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{tag && <LucideHash className="w-4 h-4 mr-1.5" />}
			{icon}
			{text}
		</span>
	);
};
export default Chip;
