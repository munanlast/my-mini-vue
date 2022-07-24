import { reactive } from "../reactive";
describe('reactivity test', () =>{
    it('lucky test', () => {
        const origin = {foo:1};
        const obj = reactive(origin);
        expect(obj).not.toBe(origin);
        expect(obj.foo).toBe(1);
    })


})

