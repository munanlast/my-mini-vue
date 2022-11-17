export function createComponentInstance(vNode: any) {
	const component = {
		vNode,
		type: vNode.type,
	};
	return component;
}

export function setupComponent(instance) {
	// TODO
	// initProps
	// initSlots
	setupStatefulComponent(instance);
}
function setupStatefulComponent(instance: any) {
	const component = instance.type;
	const { setup } = component;
	if (setup) {
		const setupResult = setup();
		handleSetupResult(instance, setupResult);
	}
}

function handleSetupResult(instance: any, setupResult: any) {
	if (typeof setupResult === "object") {
		instance.setupState = setupResult;
	}
	// TODO  type function

	finishComponentSetup(instance);
}
function finishComponentSetup(instance: any) {
	const component = instance.type;
	if (component.render) {
		instance.render = component.render;
	}
}
