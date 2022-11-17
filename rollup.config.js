import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import pkg from "./load-package.cjs";
export default {
	input: "./src/index.ts",
	output: [
		{
			format: "cjs",
			file: pkg.main,
			sourcemap: true,
		},
		{
			format: "es",
			file: pkg.module,
			sourcemap: true,
		},
	],
	plugins: [
		resolve(),
		typescript(),
		json({
			namedExports: false,
		}),
	],
};
