import { isTracking, trackEffect, triggerEffect } from "./effect";
import { reactive } from "./reactive";
import { hasChanged, isObject } from "./utils";

class RefImpl {
	private _value: any;
	public dep: any;
	private _rawValue: any;

	public __v_isRef = true;
	constructor(value) {
		this._rawValue = value;
		this._value = convert(value);
		this.dep = new Set();
	}
	get value() {
		if (isTracking()) {
			trackEffect(this.dep);
		}
		return this._value;
	}

	set value(newValue) {
		if (hasChanged(this._rawValue, newValue)) {
			this._value = convert(newValue);
			this._rawValue = newValue;
			triggerEffect(this.dep);
		}
	}
}

export function ref(raw) {
	return new RefImpl(raw);
}

export function isRef(raw) {
	return !!raw.__v_isRef;
}

export function unRef(raw) {
	return isRef(raw) ? raw.value : raw;
}

function convert(value) {
	return isObject(value) ? reactive(value) : value;
}
