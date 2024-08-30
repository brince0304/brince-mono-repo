"use client";
import type { ComponentType, FC, SVGProps } from "react";
import Text from "../ui/Text/Text";

export interface TextGridProps {
	title: string;
	description: string;
	Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const TextGrid: FC<TextGridProps> = ({ title, description, Icon }) => (
	<div className="flex flex-col gap-2 p-4">
		<div className="flex items-center gap-2">
			{Icon && (
				<div className="w-8 h-8 text-blue-500 dark:text-blue-400">
					{<Icon />}
				</div>
			)}
			<Text variant="h2" className="font-bold text-gray-900">
				{title}
			</Text>
		</div>
		<Text variant="p" className={"text-muted-foreground"}>
			{description}
		</Text>
	</div>
);

export default TextGrid;
