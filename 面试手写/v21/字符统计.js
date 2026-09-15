/**
 * 统计字符串中每个字符出现次数
 *
 * 模式要熟：map.set(key, (map.get(key) || 0) + 1)
 * 订单状态、商品分类、用户行为、日志类型，都是这一套。
 *
 * @param {string} str
 * @returns {Map<string, number>}
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(k)  k 为不同字符数量
 */
function countChars(str) {
  const map = new Map()

  for (const char of str) {
    map.set(char, (map.get(char) || 0) + 1)
  }

  return map
}

/**
 * 找字符串中第一个不重复字符
 *
 * 第一遍：Map 统计次数。
 * 第二遍：按原字符串顺序找第一个 count === 1。
 * O(n)+O(n) 仍是 O(n)，不是 O(n²)。
 *
 * @param {string} str
 * @returns {string|null}
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(k)
 */
function firstUniqueChar(str) {
  const countMap = new Map()

  for (const char of str) {
    countMap.set(char, (countMap.get(char) || 0) + 1)
  }

  for (const char of str) {
    if (countMap.get(char) === 1) return char
  }

  return null
}

console.log(countChars('aabbccc'))
// Map { a:2, b:2, c:3 }

console.log(firstUniqueChar('leetcode')) // l
console.log(firstUniqueChar('aabbccd'))  // d
console.log(firstUniqueChar('aabb'))     // null
