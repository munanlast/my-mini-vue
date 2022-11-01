import { createComponentInstance, setupComponent } from "./component";

export function render(vNode, container) {
	// patch 方法，一直不懂得逻辑
	patch(vNode, container);
}

function patch(vNode, container) {
	// 简要区分element / component

	processElement(vNode, container);

	processComponent(vNode, container);
}
function processComponent(vNode: any, container: any) {
	mountComponent(vNode, container);
}
function mountComponent(vNode: any, container: any) {
	const instance = createComponentInstance(vNode);
	setupComponent(instance);
	setupRenderEffect(instance, container);
}
function setupRenderEffect(instance: any, container) {
	const subTree = instance.render();
	patch(subTree, container);
}
function processElement(vNode: any, container: any) {
	throw new Error("Function not implemented.");
}
