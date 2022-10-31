import { computed } from "../computed";
import { reactive } from "../reactive";

describe("computed luck", () => {
	it("test", () => {
		const obj = reactive({
			age: 0,
		});
		const age = computed(() => {
			return obj.age;
		});
		expect(age.value).toBe(0);
	});

	it("lazy", () => {
		const obj = reactive({
			age: 0,
		});
		const getter = jest.fn(() => {
			return obj.age;
		});
		const getter2 = jest.fn(() => {
			return obj.age + 1;
		});
		const age = computed(getter);

		const age2 = computed(getter);

		// lazy
		expect(getter).not.toHaveBeenCalled();

		expect(age.value).toBe(0);

		expect(getter).toHaveBeenCalledTimes(1);

		age.value;
		expect(getter).toHaveBeenCalledTimes(1);

		obj.age = 1;
		expect(age.value).toBe(1);
		expect(getter).toHaveBeenCalledTimes(2);
	});
});
