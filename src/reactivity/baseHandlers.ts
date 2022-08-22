import { track, trigger } from "./effect";
import { reactive, ReactiveEnum, readonly } from "./reactive";
import { isObject } from './utils/index.js'

const reactiveGet = createGetter();
const reactiveSet = createSetter();
const readonlyGet = createGetter(true);
const readonlySet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);

function createGetter(isReadonly = false, isShallow = false){
    return function get (target, key) {

        if(key === ReactiveEnum.IS_REACTIVE) {
            return !isReadonly;
        }
        if(key === ReactiveEnum.IS_READONLY) {
            return isReadonly;
        }
        // 依赖收集
        if(!isReadonly){
            track(target, key);
        }
        const res =  Reflect.get(target, key);
        if(isObject(res) && !isShallow){
            if(isReadonly){
                return readonly(res)
            }
            return reactive(res)
        }
        return res
    }
}

function createSetter(isReadonly = false){
    return function  set(target, key, value) {
        if(isReadonly){
            console.error(`key: ${key} can't be set , cause target is readonly`, target);
            return true
        }else {
            const res = Reflect.set(target, key, value);
            trigger(target ,key);
            return res;
        }

    }
}

export const baseHandlers = {
    get: reactiveGet,
    set: reactiveSet
}
export const readOnlyHandlers = {
    get: readonlyGet,
    set: readonlySet
}

export const shallowReadonlyHandler ={
    get: shallowReadonlyGet,
    set: readonlySet
}