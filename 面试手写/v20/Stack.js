/** Stack · 考完对照 */

function isValid(s) {
  const stack = []
  const map = { ')': '(', ']': '[', '}': '{' }
  for (const char of s) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char)
      continue
    }
    if (stack.pop() !== map[char]) return false
  }
  return stack.length === 0
}

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
    if (value === this.minStack[this.minStack.length - 1]) this.minStack.pop()
    return value
  }
  top() {
    return this.stack[this.stack.length - 1]
  }
  getMin() {
    return this.minStack[this.minStack.length - 1]
  }
}
