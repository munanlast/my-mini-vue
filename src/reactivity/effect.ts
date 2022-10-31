var activeEffect;
let shouldTrack = false;
//
export class ReactiveEffect {
	private _fn: any;
	deps = [];
	active = true;
	onStop?: any;
	constructor(fn, public scheduler?) {
		this._fn = fn;
	}
	run() {
		// 执行 fn  但是不收集依赖
		if (!this.active) {
			return this._fn();
		}
		// 可以开始收集依赖了
		shouldTrack = true;

		activeEffect = this;
		const result = this._fn();
		// 重置
		shouldTrack = false;
		activeEffect = undefined;
		return result;
	}
	stop() {
		if (!this.active) return;
		this.deps.forEach((dep: any) => {
			dep.delete(this);
		});
		if (this.onStop) {
			this.onStop();
		}
		this.active = false;
	}
}
export function effect(fn, options: any = {}) {
	const _effect = new ReactiveEffect(fn, options.scheduler);
	Object.assign(_effect, options);
	// 创建effect自动执行run，收集依赖
	// 在run方法中需要有响应式变量
	_effect.run();
	const runner: any = _effect.run.bind(_effect);
	runner.effect = _effect;
	return runner;
}

const effectMap = new Map();

export function track(target, key) {
	let depsMap = effectMap.get(target);
	if (!depsMap) {
		depsMap = new Map();
		effectMap.set(target, depsMap);
	}
	let dep = depsMap.get(key);
	if (!dep) {
		dep = new Set();
		depsMap.set(key, dep);
	}
	if (!activeEffect) return;
	trackEffect(dep);
}

export function trackEffect(dep) {
	dep.add(activeEffect);
	activeEffect.deps.push(dep);
}

export function trigger(target, key) {
	let dep = effectMap.get(target).get(key);
	triggerEffect(dep);
}

export function triggerEffect(dep) {
	for (let effect of dep) {
		if (effect.scheduler) {
			effect.scheduler();
		} else {
			effect.run();
		}
	}
}

export function stop(runner) {
	runner.effect.stop();
}

export function isTracking() {
	return shouldTrack && activeEffect !== undefined;
}
