import { track, trigger } from "./effect";
export function reactive (raw) {
    return new Proxy(raw, {
        get (target, key) {
            // 依赖收集
            track(target, key);
            return Reflect.get(target, key);
        },
        set(target, key, value) {
            const res = Reflect.set(target, key, value);
            trigger(target ,key);
            return res;
        }
    })
}