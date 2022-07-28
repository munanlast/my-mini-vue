import { reactive } from "../reactive";
import { effect } from "../effect";
it('scheduler', () => {
    let run: any;
    const scheduler = jest.fn((fn) => {
        run = runner;
    })
    const obj = reactive({foo: 1})
    let newObj;
    const runner = effect(() => {
        newObj = obj.foo;
    },
    { scheduler })

    // effect 初始化的时候scheduler不执行
    expect(scheduler).not.toHaveBeenCalled();
    expect(newObj).toBe(1);
    obj.foo++;
    //  触发trigger 后执行scheduler
    expect(scheduler).toHaveBeenCalledTimes(1);
    expect(newObj).toBe(1);
    // 执行run
    run();
    expect(newObj).toBe(2);

})