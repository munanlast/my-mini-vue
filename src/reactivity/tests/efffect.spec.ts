import { reactive } from "../reactive";
import { effect } from "../effect";
describe("effect test", () => {
    it('do some right', () => {
        const origin = {foo: 1}
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