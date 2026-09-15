/**
 * 两个数组的不重复交集
 *
 * Set 只关心「有没有」。nums1 进 Set，扫 nums2，命中就放进结果 Set。
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @returns {number[]}
 *
 * 时间复杂度：O(n + m)
 * 空间复杂度：O(n + m)
 */
function intersection(nums1, nums2) {
  const set1 = new Set(nums1)
  const result = new Set()

  for (const num of nums2) {
    if (set1.has(num)) result.add(num)
  }

  return [...result]
}

/**
 * 保留重复次数的交集
 *
 * [1,2,2,1] ∩ [2,2] → [2,2]
 * Set 不够，因为它不记 2 出现几次。用 Map 记 nums1 的频次，扫 nums2 时能减就减。
 *
 * Set 适合存在性；Map 适合存在性 + 附加信息（次数/下标/对象）。
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @returns {number[]}
 *
 * 时间复杂度：O(n + m)
 * 空间复杂度：O(n)
 */
function intersectWithDup(nums1, nums2) {
  const count = new Map()
  for (const num of nums1) {
    count.set(num, (count.get(num) || 0) + 1)
  }

  const result = []
  for (const num of nums2) {
    const left = count.get(num) || 0
    if (left > 0) {
      result.push(num)
      count.set(num, left - 1)
    }
  }
  return result
}

console.log(intersection([1, 2, 2, 1], [2, 2]))       // [2]
console.log(intersectWithDup([1, 2, 2, 1], [2, 2]))   // [2, 2]
console.log(intersectWithDup([4, 9, 5], [9, 4, 9, 8, 4])) // [9, 4]
