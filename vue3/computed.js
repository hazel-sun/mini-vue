
function computed(fn) {
  const result = ref()
  effect(() => result.value = fn()) // 执行computed传入函数
  return result
}
