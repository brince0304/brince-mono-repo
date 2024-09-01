"use client";
import Heart from "@/assets/lottie/heart.json";
import LottieComponent from "@/components/LottieAnimation/LottieComponent";
import useLikePost from "@/hooks/post/useLikePost";
import { Button } from "@brince-mono-repo/shared-components";
import { ReloadIcon } from "@radix-ui/react-icons";
import type React from "react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface LikeButtonProps {
	className?: string;
	isLiked?: boolean;
	slug: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ className = "", slug }) => {
	const [isAnimating, setIsAnimating] = useState(false);

	const { mutate: likePost, isPending } = useLikePost(slug, {
		onSuccess: () => toast.success("좋아해주셔서 감사합니다 😭"),
		onError: () => toast.error("이미 좋아요를 누르셨어요 😊"),
	});

	const handleLikePost = useCallback(() => {
		setIsAnimating(true);
		likePost();
	}, [likePost]);

	const handleAnimationComplete = useCallback(() => {
		setIsAnimating(false);
	}, []);

	return (
		<Button
			variant="outline"
			className={`w-12 h-12 rounded-full justify-center relative ${className}
            ${!isAnimating ? "overflow-hidden" : ""}`}
			size="icon"
			onClick={handleLikePost}
			disabled={isPending}
		>
			<div className="absolute inset-0 flex items-center justify-center">
				{!isPending && (
					<LottieComponent
						animationData={Heart}
						autoplay={isAnimating}
						loop={false}
						isStopped={!isAnimating}
						onComplete={handleAnimationComplete}
						className={"scale-[2] "}
					/>
				)}
				{isPending && <ReloadIcon className="animate-spin" />}
			</div>
		</Button>
	);
};

export default LikeButton;
