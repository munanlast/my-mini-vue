import { reactive } from "../reactive";
import { effect, stop } from "../effect";
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
it('stop', ()=>{
    let dummy;
    const obj = reactive({foo: 1});
    const runner = effect(() => {
        dummy = obj.foo;
    })
    obj.foo = 2;
    expect(dummy).toBe(2);
    stop(runner);
    obj.foo = 3;
    // 依赖收集deps中被删除，响应式失效，但是runner仍可触发
    expect(dummy).toBe(2);
    runner();
    expect(dummy).toBe(3);

})

it('onStop 使用stop的回调函数', () => {
    let dummy;
    const obj = reactive({foo: 1});
    const onStop = jest.fn();
    const runner = effect(() => {
        dummy = obj.foo;
    },{
        onStop
    })
    stop(runner);
    expect(onStop).toBeCalledTimes(1);
})
