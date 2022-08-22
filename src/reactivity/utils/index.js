export const isObject = (raw) => {
	return raw !== null && typeof raw === "object";
};

export const hasChanged = (val, newVal) => {
	return !Object.is(val, newVal);
};
