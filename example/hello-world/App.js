import { h } from "../../lib/guide-mini-vue.esm.js";
export const App = {
	render() {
		return h("div", { id: "root" }, [
			h("p", { class: "red" }, "this is p"),
			h("pre", { class: "blue" }, "this is pre"),
		]);
	},
	setup() {
		return {
			msg: "hello world",
		};
	},
};
