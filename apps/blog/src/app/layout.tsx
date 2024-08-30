import ClientLayout from "@/app/layout.client";
import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import React, { type ReactNode } from "react";
import "@brince-mono-repo/shared-styles";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
	title: "개발브ㄹ로그",
	description:
		"춤을 사랑하는 프론트엔드 개발자 브린스 입니다. 삶을 공유하면서 함께 성장하는 개발자가 되고 싶습니다.",
};

export const viewport: Viewport = {
	width: "device-width",
	height: "device-height",
	initialScale: 1,
	themeColor: [
		{ media: "(prefers-color-scheme: dark)", color: "#171717" },
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
	],
};

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export default function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<html lang="ko" className={"scroll-smooth light"}>
			<head>
				<link
					rel="stylesheet"
					as="style"
					crossOrigin="anonymous"
					href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
				/>
			</head>
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable,
				)}
			>
				<ClientLayout>{children}</ClientLayout>
			</body>
		</html>
	);
}
