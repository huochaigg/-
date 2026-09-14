/**
 * 简单 Stack：用数组尾部模拟，不要 shift/unshift
 *
 * push/pop/peek/isEmpty/size：O(1)
 * 空间：O(n)
 */
class Stack {
  constructor() {
    this.items = []
  }

  push(value) {
    this.items.push(value)
  }

  pop() {
    return this.items.pop()
  }

  peek() {
    return this.items[this.items.length - 1]
  }

  isEmpty() {
    return this.items.length === 0
  }

  size() {
    return this.items.length
  }
}

const s = new Stack()
s.push('A')
s.push('B')
s.push('C')
console.log(s.peek()) // C
console.log(s.pop(), s.pop(), s.pop()) // C B A
console.log(s.isEmpty(), s.size())
