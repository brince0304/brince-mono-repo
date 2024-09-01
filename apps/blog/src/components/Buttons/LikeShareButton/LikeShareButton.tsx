import LikeButton from "@/components/Buttons/LikeButton/LikeButton";
import ShareButton from "@/components/Buttons/ShareButton/ShareButton";
import type React from "react";

interface LikeAndShareProps {
	isLiked?: boolean;
	slug: string;
	className?: string;
}

const LikeShareButton: React.FC<LikeAndShareProps> = ({
	isLiked = false,
	slug,
	className = "",
}) => {
	return (
		<div className={`flex flex-col gap-2 ${className}`}>
			<LikeButton isLiked={isLiked} slug={slug} />
			<ShareButton />
		</div>
	);
};

export default LikeShareButton;
