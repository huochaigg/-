/**
 * 有序数组两数之和：左右夹逼
 * 时间 O(n) 空间 O(1)
 *
 * 无序用 Map（V21）；有序可省掉 O(n) 空间
 */
function twoSumSorted(nums, target) {
  let left = 0
  let right = nums.length - 1
  while (left < right) {
    const sum = nums[left] + nums[right]
    if (sum === target) return [left, right]
    if (sum < target) left++
    else right--
  }
  return []
}

console.log(twoSumSorted([2, 7, 11, 15], 9)) // [0, 1]
