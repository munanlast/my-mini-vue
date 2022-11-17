import { createComponentInstance, setupComponent } from "./component";

export function render(vNode, container) {
	// patch 方法，一直不懂得逻辑
	patch(vNode, container);
}

function patch(vNode, container) {
	// 简要区分element / component
	if (typeof vNode.type === "string") {
		processElement(vNode, container);
	} else {
		processComponent(vNode, container);
	}
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
	mountElement(vNode, container);
}
function mountElement(vNode: any, container: any) {
	const el = document.createElement(vNode.type);
	const { props } = vNode;
	for (const key in props) {
		const val = props[key];
		el.setAttribute(key, val);
	}
	const { children } = vNode;
	//  string or array
	if (typeof children === "string") {
		el.textContent = children;
	} else {
		children.forEach((child) => {
			patch(child, el);
		});
	}

	container.append(el);
}
