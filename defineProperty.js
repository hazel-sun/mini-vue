// 模拟 Vue 实例
let vm = {}
// 把多个属性转化 响应式
export const proxyData = (data) => {
  // 把data 中每一项都[msg,age] 拿出来操作
  Object.keys(data).forEach((key) => {
    // 对 vm 的 属性 进行数据劫持
    Object.defineProperty(vm, key, {
      // 可枚举
      enumerable: true,
      // 可配置
      configurable: true,
      // 获取数据
      get() {
        return data[key]
      },
      // 设置 属性值
      set(newValue) {
        // 如果传入的值相等就不用修改
        if (newValue === data[key]) return
        // 修改数据
        data[key] = newValue
        document.querySelector('#app').textContent = data[key]
      },
    })
  })
}