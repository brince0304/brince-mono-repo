import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import autoprefixer from "autoprefixer";
import MagicString from "magic-string";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";

export default [
	{
		input: "src/index.ts",
		output: [
			{
				file: "dist/index.js",
				format: "cjs",
				sourcemap: true,
			},
			{
				file: "dist/index.esm.js",
				format: "esm",
				sourcemap: true,
			},
		],
		external: ["react", "react-dom", "next/link"],
		plugins: [
			resolve(),
			commonjs(),
			typescript({
				tsconfig: "./tsconfig.json",
				declaration: true,
				declarationDir: "dist",
				rootDir: "src",
			}),
			postcss({
				plugins: [tailwindcss, autoprefixer],
				extract: "styles.css",
				modules: false,
				inject: false,
			}),
			babel({
				extensions: [".js", ".jsx", ".ts", ".tsx"],
				presets: ["@babel/preset-react", "@babel/preset-typescript"],
				babelHelpers: "bundled",
				plugins: [
					["babel-plugin-add-import-extension", { extension: "js" }],
					[
						"babel-plugin-transform-inline-environment-variables",
						{ include: ["USE_CLIENT"] },
					],
				],
			}),
			{
				name: "add-use-client",
				renderChunk(code, chunk, options) {
					const magicString = new MagicString(code);
					magicString.prepend("'use client';\nimport React from 'react';\n");

					return {
						code: magicString.toString(),
						map: magicString.generateMap({ hires: true }),
					};
				},
			},
		],
	},
	{
		input: "src/styles.ts",
		output: {
			file: "dist/styles.js",
			format: "esm",
		},
		plugins: [
			postcss({
				plugins: [tailwindcss, autoprefixer],
				extract: "styles.css",
				modules: false,
				inject: false,
			}),
		],
	},
];
