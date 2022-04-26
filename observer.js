/* observer.js */

/**
 * 1.通过Object.defineProperty将数据劫持
 * 2.每个属性都有自己的dep属性，存放依赖他的watcher
 * 3.属性变化后会通知自己对应的watcher去更新
 */
export class Observer {
  constructor(data) {
    // 用来遍历 data
    this.walk(data)
  }
  // 遍历 data 转为响应式
  walk(data) {
    // 判断 data是否为空 和 对象
    if (!data || typeof data !== 'object') return
    // 遍历 data
    Object.keys(data).forEach((key) => {
      // 转为响应式
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive(obj, key, value) {
    // 如果是对象类型的 也调用walk 变成响应式，不是对象类型的直接在walk会被return
    this.walk(value)
    // 创建 Dep 对象
    let dep = new Dep()
    // 保存一下 this
    const self = this
    Object.defineProperty(obj, key, {
      // 设置可枚举 - 可以被循环
      enumerable: true,
      // 设置可配置 - 可以被修改
      configurable: true,
      // 获取值
      get() {
        // 在这里添加观察者对象 Dep.target 表示观察者
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      // 设置值
      set(newValue) {
        // 判断旧值和新值是否相等
        if (newValue === value) return
        // 设置新值
        value = newValue
        // 赋值的话如果是newValue是对象，对象里面的属性也应该设置为响应式的
        self.walk(newValue)
        // 触发通知 更新视图
        dep.notify()
      },
    })
  }
}

class Dep {
  constructor() {
    // 存储观察者
    this.subs = []
  }
  // 添加观察者
  addSub(sub) {
    // 判断观察者是否存在 和 是否拥有update方法
    if (sub && sub.update && typeof sub.update === "function") {
      this.subs.push(sub)
    }
  }
  // 通知方法
  notify() {
    // 触发每个观察者的更新方法
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}
