import { h } from "../../lib/guide-mini-vue.esm";
export const App = {
	render() {
		return h("div", "hi, do you want to do something?" + this.msg);
	},
	setup() {
		return {
			msg: "hello world",
		};
	},
};
