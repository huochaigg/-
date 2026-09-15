/**
 * 删除有序数组重复项，原地，返回有效长度
 * 时间 O(n) 空间 O(1)
 *
 * 有序 → 重复一定相邻。Set 也能做但额外 O(n) 空间，本题考原地。
 */
function removeDuplicates(nums) {
  if (nums.length === 0) return 0
  let slow = 0
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++
      nums[slow] = nums[fast]
    }
  }
  return slow + 1
}

const nums = [1, 1, 2, 2, 3]
const k = removeDuplicates(nums)
console.log(k, nums.slice(0, k)) // 3 [1, 2, 3]
