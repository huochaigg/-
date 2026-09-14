function ListNode(value, next = null) {
  this.value = value
  this.next = next
}

/**
 * 找到链表环的入口节点
 *
 * @param {ListNode | null} head
 * @returns {ListNode | null}
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 *
 * 第一阶段 1/2 直到相遇；第二阶段两边都走 1 步
 */
function detectCycle(head) {
  let slow = head
  let fast = head

  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next

    if (slow === fast) {
      let pointer = head
      while (pointer !== slow) {
        pointer = pointer.next
        slow = slow.next
      }
      return pointer
    }
  }
  return null
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

const head = fromArray([1, 2, 3, 4, 5, 6], 2) // 入口是 3
const entry = detectCycle(head)
console.log(entry && entry.value) // 3
console.log(detectCycle(fromArray([1, 2, 3]))) // null
