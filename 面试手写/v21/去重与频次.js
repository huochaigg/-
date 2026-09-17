/**
 * 数组去重 —— 常见写法对照
 *
 * 1. Set（首选）：最短，NaN 只留一个；对象按引用
 * 2. Map / filter + seen：不许 Set 时最常用，思路同 Set
 * 3. reduce + includes：好讲，但 includes 导致约 O(n²)
 * 4. filter + indexOf：只留第一次出现，同样约 O(n²)
 * 5. 排序后比相邻：可 O(1) 额外空间（会打乱原序，或需记原下标）
 *
 * 对象按字段去重 → uniqueBy（见 V9）；嵌套先 flat 再 Set
 * 优先仍是 Set；追问复杂度 / 不许 Set 再亮 2～5
 */

/** 1. Set */
function unique(arr) {
  return [...new Set(arr)]
}

/** 2. Map / seen（不许用 Set 时） */
function uniqueMap(arr) {
  const seen = new Map()
  const result = []
  for (const item of arr) {
    if (seen.has(item)) continue
    seen.set(item, true)
    result.push(item)
  }
  return result
}

/** 3. reduce + includes（能讲清，大数据别用） */
function uniqueReduce(arr) {
  return arr.reduce((acc, cur) => {
    if (!acc.includes(cur)) acc.push(cur)
    return acc
  }, [])
}

/** 4. filter + indexOf：下标等于首次出现位置才保留 */
function uniqueIndexOf(arr) {
  return arr.filter((item, i) => arr.indexOf(item) === i)
}

/**
 * 5. 排序后比相邻
 * 注意：会改变相对顺序；若不能改原数组先拷贝
 * 时间 O(n log n)，额外空间可做到 O(1)（不计排序实现）
 */
function uniqueSort(arr) {
  if (arr.length === 0) return []
  const sorted = [...arr].sort((a, b) => (a > b ? 1 : a < b ? -1 : 0))
  const result = [sorted[0]]
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] !== sorted[i - 1]) result.push(sorted[i])
  }
  return result
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

console.log('Set', unique([1, 2, 2, 1, 3]))                 // [1, 2, 3]
console.log('Map', uniqueMap([1, 2, 2, 1, 3]))              // [1, 2, 3]
console.log('reduce', uniqueReduce([1, 2, 2, 1, 3]))        // [1, 2, 3]
console.log('indexOf', uniqueIndexOf([1, 2, 2, 1, 3]))      // [1, 2, 3]
console.log('sort', uniqueSort([1, 2, 2, 1, 3]))            // [1, 2, 3]（已排序）
console.log(containsDuplicate([1, 2, 3, 1]))  // true
console.log(containsDuplicate([1, 2, 3]))     // false
console.log(countFreq(['pending', 'paid', 'pending']))
