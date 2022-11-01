import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";
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
	plugins: [typescript()],
};
