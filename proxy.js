// 模拟 Vue 的一个实例
// Proxy 第一个
export const proxyData = data => {
  let vm = new Proxy(data, {
    // get() 获取值
    // target 表示需要代理的对象这里指的就是 data
    // key 就是对象的 键
    get(target, key) {
      return target[key]
    },
    // 设置值
    // newValue 是设置的值
    set(target, key, newValue) {
      // 也先判断下是否和之前的值一样 节省性能
      if (target[key] === newValue) return
      // 进行设置值
      target[key] = newValue
      document.querySelector('#app').textContent = target[key]
    },
  })
}