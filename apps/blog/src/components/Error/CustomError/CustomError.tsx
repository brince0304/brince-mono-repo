import { Text } from "@brince-mono-repo/shared-components";
import type React from "react";

interface CustomErrorProps {
	code: number;
	message: string;
	emoji?: string;
}

const CustomError: React.FC<CustomErrorProps> = ({ code, message, emoji }) => {
	return (
		<div className="flex flex-col items-center justify-center text-gray-900 dark:text-white gap-4 pt-16">
			<Text variant={"h2"} className="font-semibold">
				{code}
			</Text>
			<Text variant={"h3"}>{message}</Text>
			<div className="w-16 h-16 rounded-full bg-yellow-400 dark:bg-yellow-300 flex items-center justify-center mb-8">
				<span className="text-3xl">{emoji}</span>
			</div>
			<a
				href="/apps/blog/public"
				className="px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition duration-300"
			>
				돌아가기
			</a>
		</div>
	);
};

export default CustomError;
