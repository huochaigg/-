/**
 * 数组去重
 *
 * 面试可能追问：不许用 Set？
 * 可用 Map、排序后比相邻；indexOf 方案可能退化到 O(n²)。
 * 优先仍是 Set。
 *
 * @param {Array} arr
 * @returns {Array}
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */
function unique(arr) {
  return [...new Set(arr)]
}

/**
 * 判断数组是否存在重复元素
 *
 * visited / seen：当前值之前出现过就 true。
 * 和 V13 图遍历的 visited Set 是同一思路。
 *
 * @param {number[]} nums
 * @returns {boolean}
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */
function containsDuplicate(nums) {
  const seen = new Set()

  for (const num of nums) {
    if (seen.has(num)) return true
    seen.add(num)
  }

  return false
}

/**
 * 用 Map 统计数组元素频次
 *
 * @param {Array} arr
 * @returns {Map<any, number>}
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(k)
 */
function countFreq(arr) {
  const map = new Map()
  for (const item of arr) {
    map.set(item, (map.get(item) || 0) + 1)
  }
  return map
}

console.log(unique([1, 2, 2, 1, 3]))          // [1, 2, 3]
console.log(containsDuplicate([1, 2, 3, 1]))  // true
console.log(containsDuplicate([1, 2, 3]))     // false
console.log(countFreq(['pending', 'paid', 'pending']))
