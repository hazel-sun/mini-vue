/**
 * 通过proxy
 * 1.我们访问监听的数据的时候收集依赖
 * 2.更改数据的时候自动就通知更新
 * @param {*} target 
 * @returns 
 */

 const targetMap = new WeakMap()
 function track(target, key) {
     // 如果此时activeEffect为null则不执行下面
     // 这里判断是为了避免例如console.log(person.name)而触发track
     if (!activeEffect) return
     let depsMap = targetMap.get(target)
     if (!depsMap) {
         targetMap.set(target, depsMap = new Map())
     }
 
     let dep = depsMap.get(key)
     if (!dep) {
         depsMap.set(key, dep = new Set())
     }
     dep.add(activeEffect) // 把此时的activeEffect添加进去
 }
 function trigger(target, key) {
     let depsMap = targetMap.get(target)
     if (depsMap) {
         const dep = depsMap.get(key)
         if (dep) {
             dep.forEach(effect => effect())
         }
     }
 }
 function reactive(target) {
     const handler = {
         get(target, key, receiver) {
             track(receiver, key) // 访问时收集依赖
             return Reflect.get(target, key, receiver)
         },
         set(target, key, value, receiver) {
             Reflect.set(target, key, value, receiver)
             trigger(receiver, key) // 设值时自动通知更新
         }
     }
 
     return new Proxy(target, handler)
 }
 let activeEffect = null
 function effect(fn) {
     activeEffect = fn
     activeEffect()
     activeEffect = null
 }
 function ref(initValue) {
     return reactive({
         value: initValue
     })
 }
 function computed(fn) {
     const result = ref()
     effect(() => result.value = fn())
     return result
 }
 // 
 vue2是通过compiler



// aaa: {name: 'hahah', age: 11},
// test: 222
const targetMapaa = new WeakMap()
targetMapaa.set({name: 'hahah', age: 11}, {
  name: new Set(), // 存放所有依赖这个函数的副作用函数
  age: new Set()
})


function defineReactive(data, key, value) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
     get: function defineGet() {
      console.log(`get key: ${key} value: ${value}`)
      return value
    },
     set: function defineSet(newVal) {
      console.log(`set key: ${key} value: ${newVal}`)
      value = newVal
    }
  })
}

function observe(data) {
  Object.keys(data).forEach(function(key) {
    defineReactive(data, key, data[key])
  })
}

let arr = [1, 2, 3]
observe(arr)
arr[1]
arr[1] = 5
