import { useTheme } from "next-themes";
import React from "react";
import { ToastContainer } from "react-toastify";

const ToastContainerWrapper = () => {
	const { theme } = useTheme();

	return (
		<ToastContainer
			position="bottom-center"
			autoClose={3000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			pauseOnFocusLoss
			draggable
			icon={false}
			theme={"dark" === theme ? "dark" : "light"}
			toastClassName="bg-gray-800 dark:bg-gray-700 text-white border-l-4 border-blue-500 rounded-r-lg shadow-md p-4 mb-4 flex items-center justify-between transition-all duration-300 ease-in-out"
			progressStyle={{
				height: "2px",
				background: "linear-gradient(to right, #3b82f6, #60a5fa)",
				boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
				transition: "width 0.3s ease-in-out",
			}}
			pauseOnHover
		/>
	);
};

export default ToastContainerWrapper;
