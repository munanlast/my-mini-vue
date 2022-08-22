import { effect } from "../effect";
import { isReactive } from "../reactive";
import { isRef, ref, unRef } from "../ref";

describe("ref  happy", () => {
	it("simple ref", () => {
		const count = ref(1);
		expect(isReactive(count)).toBe(false);
		expect(count.value).toBe(1);
		expect(isRef(count)).toBe(true);
		expect(unRef(count)).toBe(1);
		expect(unRef(1)).toBe(1);
	});
	it("should be reactive", () => {
		const a = ref(1);
		let dummy;
		let count = 0;
		effect(() => {
			count++;
			dummy = a.value;
		});
		expect(count).toBe(1);
		expect(dummy).toBe(1);

		a.value++;
		expect(count).toBe(2);
		expect(dummy).toBe(2);
		a.value = 2;

		expect(count).toBe(2);
	});
	it("nested properties reactive", () => {
		const a = ref({ count: 1 });
		let dummy;
		effect(() => {
			dummy = a.value.count;
		});
		expect(dummy).toBe(1);
		a.value.count = 2;
		expect(dummy).toBe(2);
	});
});
