/**
 * 原地合并：nums1 尾部已预留 n 个空位
 * 从后往前写，避免覆盖 nums1 未处理部分
 * 时间 O(m+n) 空间 O(1)
 *
 * nums1 若有剩余，本来就在正确位置；nums2 有剩余必须拷进来
 */
function merge(nums1, m, nums2, n) {
  let p1 = m - 1
  let p2 = n - 1
  let p = m + n - 1

  while (p1 >= 0 && p2 >= 0) {
    if (nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1]
      p1--
    } else {
      nums1[p] = nums2[p2]
      p2--
    }
    p--
  }

  while (p2 >= 0) {
    nums1[p] = nums2[p2]
    p--
    p2--
  }
}

const nums1 = [1, 2, 3, 0, 0, 0]
merge(nums1, 3, [2, 5, 6], 3)
console.log(nums1) // [1, 2, 2, 3, 5, 6]
