var activeEffect;
//
class  ReactiveEffect {
    private _fn: any;
    constructor(fn, public scheduler?){
        this._fn = fn;
    }
    run () {
        activeEffect = this;
        return this._fn();
    }
}
export function effect (fn, options:any ={}) {

    const _effect = new ReactiveEffect(fn, options.scheduler);
    _effect.run();
    return  _effect.run.bind(_effect);
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
    if(effect.scheduler){
        effect.scheduler()
    }else {
        effect.run();
    }
   }
};
