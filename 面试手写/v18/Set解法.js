function ListNode(value, next = null) {
  this.value = value
  this.next = next
}

/**
 * 使用 Set 判断链表是否有环
 *
 * @param {ListNode | null} head
 * @returns {boolean}
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n) —— Set 最多装下全部节点
 */
function hasCycleBySet(head) {
  const visited = new Set()
  let current = head

  while (current) {
    if (visited.has(current)) return true
    visited.add(current)
    current = current.next
  }
  return false
}

function fromArray(arr, pos = -1) {
  const dummy = new ListNode(0)
  let cur = dummy
  const nodes = []
  for (const v of arr) {
    cur.next = new ListNode(v)
    cur = cur.next
    nodes.push(cur)
  }
  if (pos >= 0) cur.next = nodes[pos]
  return dummy.next
}

console.log(hasCycleBySet(fromArray([1, 2, 3])))
console.log(hasCycleBySet(fromArray([1, 2, 3, 4], 1)))
