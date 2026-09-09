/**
 * 普通防抖：delay 毫秒内多次触发，只执行最后一次（setTimeout）
 */
function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * Node 防抖：合并到当前事件循环之后执行（setImmediate）
 * 适合「尽快执行，但不在当前同步代码里立刻跑」的场景
 */
function debounceImmediate(fn) {
  let timer = null
  return function (...args) {
    if (timer) clearImmediate(timer)
    timer = setImmediate(() => {
      timer = null
      fn.apply(this, args)
    })
  }
}

function search(value) {
  console.log('search:', value, Date.now())
}

const handlerTimeout = debounce(search, 200)
const handlerImmediate = debounceImmediate(search)

handlerTimeout('a')
handlerTimeout('ab')
handlerTimeout('abc') // 约 200ms 后只打印 abc

handlerImmediate('x')
handlerImmediate('xy')
handlerImmediate('xyz') // 当前事件循环结束后只打印 xyz

/*
 * ========== Node 里 setTimeout 与 setImmediate 的基本区别 ==========
 *
 * 1. 所属阶段（Event Loop）
 *    - setTimeout(fn, delay)：Timers 阶段，到期后再执行；delay 最小也会受系统调度影响
 *    - setImmediate(fn)：Check 阶段，当前轮询（poll）结束后尽快执行
 *
 * 2. delay = 0 时谁先跑？
 *    - 主模块 / 非 I/O 回调里：setTimeout(fn, 0) 和 setImmediate(fn) 谁先执行不确定
 *      （常表现为 setTimeout 先，但不能依赖）
 *    - 在 I/O 回调里（如 fs.readFile 回调）：一般 setImmediate 先于 setTimeout(fn, 0)
 *
 * 3. 取消方式
 *    - clearTimeout(timerId)
 *    - clearImmediate(immediateId)
 *
 * 4. 和防抖的关系
 *    - 需要「等用户停手 N 毫秒」→ 用 setTimeout
 *    - 需要「合并同步连调，推到本轮循环之后」→ 用 setImmediate（浏览器无此 API）
 *
 * 5. 和 process.nextTick 别混
 *    - process.nextTick 属微任务队列，优先级更高，会插在当前操作之后、下一阶段之前
 *    - setImmediate 仍是宏任务（Check 阶段），不会像 nextTick 那样可能饿死事件循环
 */
