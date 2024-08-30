import path from "node:path";
import type { Config } from "tailwindcss";

const sharedConfig = require("@brince-mono-repo/shared-tailwind-config/tailwind.config");
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
	...sharedConfig,
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
		...sharedConfig.theme,
		extend: {
			...sharedConfig.theme.extend,
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
		fontFamily: {
			sans: ["var(--font-sans)", ...fontFamily.sans],
			pretendard: ["var(--font-pretendard)", "sans-serif"],
		},
	},
	darkMode: "class",
	plugins: [...sharedConfig.plugins],
};
export default config;
