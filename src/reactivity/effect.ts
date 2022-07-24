var activeEffect;
class  ReactiveEffect {
    private _fn: any;
    constructor(fn){
        this._fn = fn;
    }
    run () {
        activeEffect = this;
        this._fn();
    }
}
const effectMap = new Map();
export  function track (target ,key) {
    let depsMap =  effectMap.get(target);
    if(!depsMap){
        depsMap = new Map();
        effectMap.set(target, depsMap);
    }
    let dep = depsMap.get(key);
    if(!dep) {
        dep = new Set();
        depsMap.set(key, dep);
    }
    dep.add(activeEffect);

};

export function trigger (target, key) {
   let dep =  effectMap.get(target).get(key);
   for(let effect of  dep){
    effect.run();
   }
};
export function effect (fn) {
    const _effect = new ReactiveEffect(fn);
    _effect.run();
}