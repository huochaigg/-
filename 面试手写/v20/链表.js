/** 链表 · 考完对照 */

function reverseList(head) {
  let prev = null
  let current = head
  while (current) {
    const next = current.next
    current.next = prev
    prev = current
    current = next
  }
  return prev
}

function middleNode(head) {
  let slow = head
  let fast = head
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  return slow
}

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
