import { reactive, readonly, isReactive, isReadonly} from "../reactive";
describe('reactivity test', () =>{
    it('lucky test', () => {
        const origin = {foo:1};
        const obj = reactive(origin);
        expect(obj).not.toBe(origin);
        expect(obj.foo).toBe(1);
        expect(isReactive(obj)).toBe(true);
    })
})
describe('readonly test', () =>{
    it('lucky test', () => {
        const origin = {foo:1};
        const obj = readonly(origin);
        expect(obj).not.toBe(origin);
        expect(obj.foo).toBe(1);
        expect(isReadonly(obj)).toBe(true)
    })
})

describe('isReactive', () => {
    it('happy path', () => {
        const origin = {
            obj: {
                foo : 1
            },
            arr: [1,{ bar: 2 },3]
        }
        const observed =  reactive(origin)
        expect(isReactive(observed)).toBe(true);
        expect(isReactive(observed.obj)).toBe(true);
        expect(isReactive(observed.arr)).toBe(true);
        expect(isReactive(observed.arr[1])).toBe(true);
    })
})
