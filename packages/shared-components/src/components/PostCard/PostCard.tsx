import { ArrowRight, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { BrinceAvatar } from "../BrnceAvatar";
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
				<CardContent className="p-6">
					<div className="flex items-center space-x-4 mb-4">
						<BrinceAvatar />
						<div>
							<p className="font-medium text-sm">브린스</p>
							<p className="text-xs text-muted-foreground">{date}</p>
						</div>
					</div>
					<h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
						{title}
					</h3>
					<p className="text-sm text-muted-foreground mb-4 line-clamp-2">
						{excerpt}
					</p>
					<div className="flex flex-wrap gap-2 mb-4">
						{tags.map((tag) => (
							<Badge key={tag} variant="secondary" className="text-xs">
								{tag}
							</Badge>
						))}
					</div>
				</CardContent>
				<CardFooter className="flex justify-between items-center px-6 py-4 bg-muted/50">
					<div className="flex space-x-4">
						<Button variant="ghost" size="sm" className="hover:text-primary">
							<Heart className="mr-1 h-4 w-4" />
							<span className="text-xs">{likes}</span>
						</Button>
						<Button variant="ghost" size="sm" className="hover:text-primary">
							<MessageCircle className="mr-1 h-4 w-4" />
							<span className="text-xs">{comments}</span>
						</Button>
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
