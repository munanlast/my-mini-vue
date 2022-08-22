import { baseHandlers, readOnlyHandlers, shallowReadonlyHandler } from "./baseHandlers";

export const enum ReactiveEnum {
    IS_REACTIVE = '__v_isReactive',
    IS_READONLY = '__v_isReadonly'
}

export function reactive (raw) {
    return new Proxy(raw, baseHandlers)
}
export function readonly(raw) {
    return new Proxy(raw, readOnlyHandlers)
}

export function shallowReadonly(raw) {
    return new Proxy(raw, shallowReadonlyHandler)
}

export function isReactive(raw) {
    return !!raw[ReactiveEnum.IS_REACTIVE]
}

export function isReadonly(raw) {
    return !!raw[ReactiveEnum.IS_READONLY]
}

export function isProxy(raw) {
    return isReactive(raw) || isReadonly(raw);
}

