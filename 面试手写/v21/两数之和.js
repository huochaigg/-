/**
 * 两数之和 · 暴力
 * 每个数和后面所有数比较。
 *
 * @param {number[]} nums
 * @param {number} target
 * @returns {number[]}
 *
 * 时间复杂度：O(n²)
 * 空间复杂度：O(1)
 */
function twoSumBrute(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j]
    }
  }
  return []
}

/**
 * 两数之和 · Map（必须裸写）
 *
 * 当前数字 num，需要的是 need = target - num。
 * 如果 need 之前出现过，答案就是 [旧下标, 当前 i]。
 *
 * 先查 complement，再把当前值放入 Map。
 * 这样不会「自己和自己配对」，[3, 3] target=6 也能过。
 *
 * @param {number[]} nums
 * @param {number} target
 * @returns {number[]}
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */
function twoSum(nums, target) {
  // key: 数值
  // value: 下标
  const map = new Map()

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]
    const need = target - num

    if (map.has(need)) {
      return [map.get(need), i]
    }

    map.set(num, i)
  }

  return []
}

console.log(twoSum([2, 7, 11, 15], 9)) // [0, 1]
console.log(twoSum([3, 2, 4], 6))      // [1, 2]
console.log(twoSum([3, 3], 6))          // [0, 1]
console.log(twoSumBrute([2, 7, 11, 15], 9))
