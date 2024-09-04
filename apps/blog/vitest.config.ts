import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
		exclude: ["**/*.spec.js", "**/node_modules/**"],
		environment: "jsdom",
		globals: true,
		sequence: {
			shuffle: true,
		},
		poolOptions: process.env.CI
			? {
					threads: {
						singleThread: true,
					},
					forks: {
						singleFork: true,
					},
				}
			: {},
		clearMocks: true,
		maxConcurrency: process.env.CI ? 1 : 4,
		coverage: {
			provider: "v8",
			enabled: !process.env.CI,
		},
		reporters: process.env.GITHUB_ACTIONS
			? ["json", "default"]
			: ["junit", "default"],
		outputFile: "test-results.json",
	},
	resolve: {
		alias: {
			"@": "/src",
		},
	},
});
