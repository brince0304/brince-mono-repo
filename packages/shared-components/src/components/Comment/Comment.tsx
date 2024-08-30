"use client";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { useTheme } from "next-themes";
import type React from "react";
import { useMemo } from "react";
import { OWNER_IMAGE_URL } from "../../lib/constants";
import { BrinceAvatar } from "../BrnceAvatar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar/avatar";
import { Badge } from "../ui/Badge/badge";
import { Button } from "../ui/Button/button";
import { Card, CardContent } from "../ui/Card/card";

export interface CommentProps {
	author: string;
	content: string;
	createdAt: string;
	liked?: boolean;
	owner?: boolean;
	isDark: boolean;
}

const Comment: React.FC<CommentProps> = ({
	author,
	content,
	createdAt,
	liked,
	owner,
	isDark,
}) => {
	const styles = ["adventurer", "avataaars", "bottts", "personas"];
	const randomStyle = useMemo(
		() => styles[Math.floor(Math.random() * styles.length)],
		[],
	);
	const randomSeed = useMemo(() => Math.random().toString(36).substring(7), []);

	const avatarUrl = `https://api.dicebear.com/6.x/${randomStyle}/svg?seed=${randomSeed}`;

	return (
		<div className="w-full mb-6">
			<div className="flex items-start space-x-4 mb-2">
				{owner ? (
					<BrinceAvatar />
				) : (
					<Avatar>
						<AvatarImage src={avatarUrl} />
						<AvatarFallback>{author[0]}</AvatarFallback>
					</Avatar>
				)}
				<div className="flex-1">
					<div className="flex items-center space-x-2 mb-1">
						<span className="text-sm font-semibold">
							{owner ? "브린스" : author}
						</span>
						<span className="text-xs text-muted-foreground">
							{formatDistanceToNow(new Date(createdAt), {
								addSuffix: true,
								locale: ko,
							})}
						</span>
					</div>
					<Card className="p-3 mb-2 max-w-full">
						<p className="text-sm text-gray-800 dark:text-gray-200 break-words whitespace-pre-wrap">
							{content}
						</p>
					</Card>
					<div className="flex items-center gap-4">
						{liked && (
							<div className="relative inline-block">
								<BrinceAvatar className="w-7 h-7" />
								<div className="absolute top-4 left-5 p-0.5">
									<HeartFilledIcon color={isDark ? "#FFF" : "#000000"} />
								</div>
							</div>
						)}
						<Button variant="ghost" size="sm">
							답글
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Comment;
