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
				classNames: {
					toast:
						"bg-opacity-95 dark:bg-opacity-95 bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-lg rounded-lg",
					title: "font-semibold text-sm",
					description: "text-xs mt-1",
				},
				duration: 3000,
			}}
		/>
	);
}

export function ToastStyles() {
	return (
		<style jsx global>{`
      .sonner-toast {
        padding: 12px 16px;
        border: none;
        backdrop-filter: blur(8px);
      }
      .sonner-toast-container {
        --viewport-padding: 16px;
      }
      @keyframes slide-up {
        from { transform: translateY(100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .sonner-toast[data-visible="true"] {
        animation: slide-up 0.3s ease-out;
      }
    `}</style>
	);
}
