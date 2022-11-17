'use strict';

function createVNode(type, props, children) {
    const vNode = {
        type,
        props,
        children,
    };
    return vNode;
}

function createComponentInstance(vNode) {
    const component = {
        vNode,
        type: vNode.type,
    };
    return component;
}
function setupComponent(instance) {
    // TODO
    // initProps
    // initSlots
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    const component = instance.type;
    const { setup } = component;
    if (setup) {
        const setupResult = setup();
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    if (typeof setupResult === "object") {
        instance.setupState = setupResult;
    }
    // TODO  type function
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    const component = instance.type;
    if (component.render) {
        instance.render = component.render;
    }
}

function render(vNode, container) {
    // patch 方法，一直不懂得逻辑
    patch(vNode, container);
}
function patch(vNode, container) {
    // 简要区分element / component
    if (typeof vNode.type === "string") {
        processElement(vNode, container);
    }
    else {
        processComponent(vNode, container);
    }
}
function processComponent(vNode, container) {
    mountComponent(vNode, container);
}
function mountComponent(vNode, container) {
    const instance = createComponentInstance(vNode);
    setupComponent(instance);
    setupRenderEffect(instance, container);
}
function setupRenderEffect(instance, container) {
    const subTree = instance.render();
    patch(subTree, container);
}
function processElement(vNode, container) {
    mountElement(vNode, container);
}
function mountElement(vNode, container) {
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
    }
    else {
        children.forEach((child) => {
            patch(child, el);
        });
    }
    container.append(el);
}

const createApp = function (rootComponent) {
    return {
        mount(rootContainer) {
            const vNode = createVNode(rootComponent);
            render(vNode, rootContainer);
        },
    };
};

function h(type, props, children) {
    return createVNode(type, props, children);
}

exports.createApp = createApp;
exports.h = h;
//# sourceMappingURL=guide-mini-vue.cjs.js.map
