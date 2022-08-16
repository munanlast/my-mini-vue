import { baseHandlers, readOnlyHandlers } from "./baseHandlers";
import { track, trigger } from "./effect";

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

export function isReactive(raw) {
    return !!raw[ReactiveEnum.IS_REACTIVE]
}

export function isReadonly(raw) {
    return !!raw[ReactiveEnum.IS_READONLY]
}