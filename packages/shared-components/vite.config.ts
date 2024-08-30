import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import MagicString from "magic-string";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
	plugins: [
		react(),
		dts({
			insertTypesEntry: true,
			copyDtsFiles: true,
			include: ["src"],
			exclude: ["src/**/*.test.tsx", "src/**/*.stories.tsx"],
		}),
		{
			name: "add-use-client",
			renderChunk(code, chunk, options) {
				const magicString = new MagicString(code);
				magicString.prepend("'use client';\n");

				return {
					code: magicString.toString(),
					map: magicString.generateMap({ hires: true }),
				};
			},
		},
	],
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			name: "SharedComponents",
			formats: ["es", "cjs"],
			fileName: (format) => `index.${format}.js`,
		},
		rollupOptions: {
			external: ["react", "react-dom", "next/image", "next/link"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
				},
			},
			treeshake: true,
		},
		outDir: "dist",
		sourcemap: false,
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
});
