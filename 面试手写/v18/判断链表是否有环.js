function ListNode(value, next = null) {
  this.value = value
  this.next = next
}

/**
 * 判断链表是否存在环（Floyd）
 *
 * @param {ListNode | null} head
 * @returns {boolean}
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function hasCycle(head) {
  let slow = head
  let fast = head

  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) return true
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

const noCycle = fromArray([1, 2, 3, 4])
const withCycle = fromArray([1, 2, 3, 4, 5, 6], 2) // 6 → 3

console.log('无环', hasCycle(noCycle))
console.log('有环', hasCycle(withCycle))
