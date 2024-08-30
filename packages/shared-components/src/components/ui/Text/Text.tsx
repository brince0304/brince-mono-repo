"use client";
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type React from "react";

const textVariants = cva("", {
	variants: {
		variant: {
			h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
			h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
			h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
			h4: "scroll-m-20 text-xl font-semibold tracking-tight",
			p: "leading-7",
			blockquote: "mt-6 border-l-2 pl-6 italic",
			large: "text-lg font-semibold",
			small: "text-sm font-medium leading-none",
			xsmall: "text-xs",
			muted: "text-sm text-muted-foreground",
		},
	},
	defaultVariants: {
		variant: "p",
	},
});

interface TextProps
	extends React.HTMLAttributes<HTMLParagraphElement>,
		VariantProps<typeof textVariants> {
	children: React.ReactNode;
	asChild?: boolean;
}

const Text: React.FC<TextProps> = ({
	children,
	variant,
	className,
	...props
}) => {
	const Component =
		variant === "p" ||
		variant === "blockquote" ||
		variant === "large" ||
		variant === "small" ||
		variant === "xsmall" ||
		variant === "muted"
			? "p"
			: variant || "p";

	return (
		<Component className={cn(textVariants({ variant }), className)} {...props}>
			{children}
		</Component>
	);
};

export default Text;
