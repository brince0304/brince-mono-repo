// @ts-ignore
import path from "node:path";

module.exports = {
	stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-onboarding",
		"@storybook/addon-interactions",
	],
	framework: {
		name: "@storybook/nextjs",
		options: {},
	},
	docs: {
		autodocs: "tag",
	},
	webpackFinal: async (config) => {
		if (config.resolve) {
			// 모노레포 루트 디렉토리 경로 추가
			config.resolve.modules = [
				...(config.resolve.modules || []),
				path.resolve(__dirname, "../.."),
			];
		}
		return config;
	},
};
