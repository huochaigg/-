/**
 * 支持 O(1) getMin 的栈
 *
 * push/pop/top/getMin：O(1)
 * 空间：O(n)
 *
 * value <= 当前最小才进 minStack，重复最小值也要压
 */
class MinStack {
  constructor() {
    this.stack = []
    this.minStack = []
  }

  push(value) {
    this.stack.push(value)
    if (
      this.minStack.length === 0 ||
      value <= this.minStack[this.minStack.length - 1]
    ) {
      this.minStack.push(value)
    }
  }

  pop() {
    const value = this.stack.pop()
    if (value === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop()
    }
    return value
  }

  top() {
    return this.stack[this.stack.length - 1]
  }

  getMin() {
    return this.minStack[this.minStack.length - 1]
  }
}

const m = new MinStack()
debugger
m.push(2)
m.push(1)
m.push(1)
console.log(m.getMin()) // 1
m.pop()
console.log(m.getMin()) // 1  第二个 1 还在
m.pop()
console.log(m.getMin()) // 2
