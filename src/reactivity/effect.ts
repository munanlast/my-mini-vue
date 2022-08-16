var activeEffect;
//
class  ReactiveEffect {
    private _fn: any;
    deps = [];
    active = true;
    onStop?: any;
    constructor(fn, public scheduler?){
        this._fn = fn;
    }
    run () {
        activeEffect = this;
        return this._fn();
    }
    stop(){
        if(!this.active) return;
        this.deps.forEach((dep: any) => {
            dep.delete(this);
        })
        if(this.onStop){
            this.onStop();
        }
        this.active = false;
    }
}
export function effect (fn, options:any ={}) {
    const _effect = new ReactiveEffect(fn, options.scheduler);
    Object.assign(_effect, options);
    _effect.run();
    const runner: any = _effect.run.bind(_effect)
    runner.effect = _effect
    return runner;
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
    if(!activeEffect) return;
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
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

export function stop(runner){
    runner.effect.stop();
}