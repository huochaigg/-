/**
 * 扁平数组转树 · 考完对照
 * 时间 O(n) 空间 O(n)
 */
function arrayToTree(list) {
  const map = new Map()
  const roots = []

  for (const item of list) {
    map.set(item.id, { ...item, children: [] })
  }

  for (const item of list) {
    const node = map.get(item.id)
    if (item.parentId === 0) {
      roots.push(node)
      continue
    }
    const parent = map.get(item.parentId)
    if (parent) parent.children.push(node)
  }
  return roots
}

const list = [
  { id: 4, parentId: 2, name: 'D' },
  { id: 2, parentId: 1, name: 'B' },
  { id: 3, parentId: 1, name: 'C' },
  { id: 1, parentId: 0, name: 'A' },
]
console.log(JSON.stringify(arrayToTree(list), null, 2))
