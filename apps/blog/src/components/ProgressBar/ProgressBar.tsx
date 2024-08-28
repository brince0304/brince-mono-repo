"use client";

import { AppProgressBar } from "next-nprogress-bar";

export default function ProgressBar() {
	return (
		<AppProgressBar
			height="3px"
			color="#4f46e5"
			options={{ showSpinner: false }}
			shallowRouting
		/>
	);
}
