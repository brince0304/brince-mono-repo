"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

export default function ToastContainerWrapper() {
	const { theme } = useTheme();

	return (
		<Toaster
			position="top-right"
			expand={false}
			theme={theme === "dark" ? "dark" : "light"}
			toastOptions={{
				duration: 3000,
			}}
		/>
	);
}
