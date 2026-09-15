/**
 * 将所有 0 移到末尾，保持非零相对顺序，原地
 * 时间 O(n) 空间 O(1)
 *
 * slow：下一个非零该放的位置
 * fast：扫描未知区域
 */
function moveZeroes(nums) {
  let slow = 0
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      ;[nums[slow], nums[fast]] = [nums[fast], nums[slow]]
      slow++
    }
  }
}

function moveZeroes2(nums) {
  let slow = 0
  for (const num of nums) {
    if (num !== 0) nums[slow++] = num
  }
  while (slow < nums.length) nums[slow++] = 0
}

const a = [0, 1, 0, 3, 12]
moveZeroes(a)
console.log(a) // [1, 3, 12, 0, 0]
