import {  readonly, isReadonly, shallowReadonly, isProxy } from "../reactive";
describe('readonly test', () =>{
    it('lucky test', () => {
        const origin = {foo:1};
        const obj = readonly(origin);
        expect(obj).not.toBe(origin);
        expect(obj.foo).toBe(1);
        expect(isReadonly(obj)).toBe(true)
        expect(isProxy(obj)).toBe(true);
    })
})

describe('shallow', () =>{
    it('shallowReadonly', () => {
        const shallow = shallowReadonly({n: { foo: 1 }});
        expect(isReadonly(shallow)).toBe(true);
        expect(isReadonly(shallow.n)).toBe(false);
    })
})