/* dep.js */
/**
 * 收集观察者(每一个监听的属性都会有一个观察者)
 */
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

