import { createVNode } from "./vNode";
import { render } from "./render";

export const createApp = function (rootComponent) {
	return {
		mount(rootContainer) {
			const vNode = createVNode(rootComponent);
			render(vNode, rootContainer);
		},
	};
};
