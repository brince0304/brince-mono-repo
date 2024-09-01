import Lottie, {
	type AnimationConfig,
	type AnimationItem,
	type RendererType,
} from "lottie-web";
import dynamic from "next/dynamic";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

interface LottieComponentProps {
	animationData?: object;
	sequentialAnimations?: object[];
	loop?: boolean;
	autoplay?: boolean;
	speed?: number;
	isPaused?: boolean;
	isStopped?: boolean;
	useSequential?: boolean;
	onComplete?: () => void;
	className?: string;
}

const LottieComponent: React.FC<LottieComponentProps> = ({
	animationData = {},
	sequentialAnimations = [],
	loop = false,
	autoplay = false,
	speed = 1,
	isPaused = false,
	isStopped = false,
	useSequential = false,
	onComplete = () => {},
	className = "",
	...restProps
}) => {
	const animationContainer = useRef<HTMLDivElement>(null);
	const [animationInstance, setAnimationInstance] =
		useState<AnimationItem | null>(null);
	const [animations, setAnimations] = useState<object[]>(sequentialAnimations);
	const [isAnimationComplete, setAnimationComplete] = useState<boolean>(false);

	const handleComplete = useCallback(() => {
		if (useSequential && animations.length === 1) {
			setAnimationComplete(true);
			return;
		}
		setAnimations(animations.slice(1));
		if (!loop) {
			setAnimationComplete(true);
		}
	}, [animations, useSequential, loop]);

	useEffect(() => {
		if (isAnimationComplete) {
			onComplete();
			setAnimationComplete(false);
		}
	}, [isAnimationComplete, onComplete]);

	useEffect(() => {
		if (typeof window !== "undefined" && animationContainer.current) {
			const animationOptions: AnimationConfig = {
				container: animationContainer.current,
				renderer: "svg",
				loop: false, // 항상 false로 설정
				autoplay: false, // 항상 false로 설정
				// @ts-ignore
				animationData: useSequential ? animations[0] : animationData,
				rendererSettings: {
					preserveAspectRatio: "xMidYMid slice",
				},
			};

			const animation = Lottie.loadAnimation(animationOptions);
			setAnimationInstance(animation);

			animation.addEventListener("complete", handleComplete);

			// 초기 상태 설정
			if (autoplay && !isPaused && !isStopped) {
				animation.play();
			}

			return () => {
				animation.removeEventListener("complete", handleComplete);
				animation.destroy();
			};
		}
	}, [
		animationData,
		animations,
		handleComplete,
		useSequential,
		autoplay,
		isPaused,
		isStopped,
	]);

	useEffect(() => {
		if (animationInstance !== null) {
			animationInstance.setSpeed(speed);

			if (isPaused) {
				animationInstance.pause();
			} else if (!isStopped) {
				if (loop) {
					animationInstance.loop = true;
				} else {
					animationInstance.loop = false;
				}
				animationInstance.play();
			}

			if (isStopped) {
				animationInstance.stop();
			}
		}
	}, [animationInstance, isPaused, isStopped, speed, loop]);

	return (
		<div
			ref={animationContainer}
			className={`w-full h-full ${className}`}
			{...restProps}
		/>
	);
};

export default LottieComponent;
