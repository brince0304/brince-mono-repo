"use client";

import { Avatar } from "@/Avatar";
import { Button } from "@/Button";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import type React from "react";
import Text from "../Text/Text";

export interface CommentProps {
	author: string;
	content: string;
	createdAt: string;
	liked?: boolean;
	owner?: boolean;
}

const Comment: React.FC<CommentProps> = ({
	author,
	content,
	createdAt,
	liked,
	owner,
}) => {
	return (
		<div className="flex flex-col mb-4 gap-2">
			<div className="flex items-center">
				<Avatar size={32} className={"mr-2"} owner={owner} />
				<div>
					<Text variant="emphasis">{owner ? "브린스" : author}</Text>
					<Text
						variant="body-small"
						className="text-gray-500 dark:text-gray-400"
					>
						{formatDistanceToNow(new Date(createdAt), {
							addSuffix: true,
							locale: ko,
						})}
					</Text>
				</div>
			</div>
			<div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
				<Text variant="body" className="">
					{content}
				</Text>
			</div>
			<div className="flex items-center">
				{liked && <Avatar size={32} className={"mr-2"} liked owner />}
				<Button variant={"transparent"} size={"small"}>
					<Text variant="body-small">답글</Text>
				</Button>
			</div>
		</div>
	);
};

export default Comment;
