import path from "node:path";
import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		path.join(
			path.dirname(require.resolve("@brince-mono-repo/shared-components")),
			"**/*.{js,ts,jsx,tsx}",
		),
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
		fontFamily: {
			sans: [
				"var(--font-noto-sans-kr)",
				"var(--font-pretendard)",
				"sans-serif",
			],
			pretendard: ["var(--font-pretendard)", "sans-serif"],
		},
	},
	darkMode: "class",
	plugins: [],
};
export default config;
