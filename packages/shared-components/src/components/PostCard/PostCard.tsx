import { ArrowRight, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { BrinceAvatar } from "../BrinceAvatar";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card, CardContent, CardFooter } from "../ui/Card";

export interface PostCardProps {
	title: string;
	excerpt: string;
	slug: string;
	date: string;
	tags: string[];
	likes?: number;
	imageUrl?: string;
	comments: number;
}

const PostCard: React.FC<PostCardProps> = ({
	title,
	excerpt,
	slug,
	date,
	tags,
	imageUrl,
	comments,
	likes = 0,
}) => {
	return (
		<Link href={`/posts/${slug}`} className="block w-full max-w-md mx-auto">
			<Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
				{imageUrl && (
					<div className="relative h-48 w-full overflow-hidden">
						<Image
							src={imageUrl}
							alt={title}
							layout="fill"
							objectFit="cover"
							className="transition-transform duration-300 group-hover:scale-105"
						/>
					</div>
				)}
				<CardContent className="p-5">
					<h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
						{title}
					</h3>
					<p className="text-sm text-muted-foreground mb-4 line-clamp-2">
						{excerpt}
					</p>
					<div className="flex flex-wrap gap-2">
						{tags.map((tag) => (
							<Badge key={tag} variant="secondary" className="text-xs">
								{tag}
							</Badge>
						))}
					</div>
				</CardContent>
				<CardFooter className="flex justify-between items-center px-5 py-3 bg-muted/50">
					<div className="flex space-x-4">
						<div className="flex items-center gap-1">
							<Heart className="mr-1 h-4 w-4" />
							<span className="text-xs">{likes}</span>
						</div>
						<div className="flex items-center gap-1">
							<MessageCircle className="mr-1 h-4 w-4" />
							<span className="text-xs">{comments}</span>
						</div>
					</div>
					<Button
						variant="ghost"
						size="sm"
						className="font-semibold group-hover:text-primary transition-colors"
					>
						Read more
						<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Button>
				</CardFooter>
			</Card>
		</Link>
	);
};

export default PostCard;
