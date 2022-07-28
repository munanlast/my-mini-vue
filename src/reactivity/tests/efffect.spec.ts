import { reactive } from "../reactive";
import { effect } from "../effect";
describe("effect test", () => {
    it('do some right', () => {
        const obj = reactive({foo: 1});
        let newObj;
        effect(()=> {
            newObj = obj.foo;
        })
        expect(newObj).toBe(1);
        // update
        obj.foo++;
        expect(newObj).toBe(2);
    })
})
it('effect runner', () => {
    //  effect 内部获取内部执行函数的返回值
    let foo = 10;
    const run =  effect(() => {
        foo++;
        return 'foo'
    })
    expect(foo).toBe(11);
    expect(run()).toBe('foo');
})
