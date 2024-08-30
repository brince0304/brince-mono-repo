import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getAvatarUrl = () => {
	const styles = ["adventurer", "avataaars", "bottts", "personas"];
	const randomStyle = styles[Math.floor(Math.random() * styles.length)];
	const randomSeed = Math.random().toString(36).substring(7);
	return `https://api.dicebear.com/6.x/${randomStyle}/svg?seed=${randomSeed}`;
};
