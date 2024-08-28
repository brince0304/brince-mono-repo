"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

export default function ToastContainerWrapper() {
	const { theme } = useTheme();

	return (
		<Toaster
			position="bottom-center"
			expand={false}
			duration={1500}
			theme={theme === "dark" ? "dark" : "light"}
		/>
	);
}
