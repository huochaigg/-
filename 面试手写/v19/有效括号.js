/**
 * 判断括号字符串是否有效
 *
 * @param {string} s
 * @returns {boolean}
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */
function isValid(s) {
  const stack = []
  const map = {
    ')': '(',
    ']': '[',
    '}': '{',
  }

  for (const char of s) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char)
      continue
    }
    if (stack.pop() !== map[char]) return false
  }
  return stack.length === 0
}

console.log(isValid('()'))       // true
console.log(isValid('()[]{}'))   // true
console.log(isValid('([{}])'))   // true
console.log(isValid('(]'))       // false
console.log(isValid('([)]'))     // false
console.log(isValid('((('))      // false
