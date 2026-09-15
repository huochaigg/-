/** Tree DFS / BFS · 考完对照 */

function treeToList(tree) {
  const result = []
  function dfs(nodes) {
    for (const node of nodes || []) {
      const { children, ...item } = node
      result.push(item)
      if (children?.length) dfs(children)
    }
  }
  dfs(tree)
  return result
}

function findPath(tree, targetId) {
  const path = []
  function dfs(nodes) {
    for (const node of nodes || []) {
      path.push(node)
      if (node.id === targetId) return true
      if (node.children?.length && dfs(node.children)) return true
      path.pop()
    }
    return false
  }
  return dfs(tree) ? [...path] : null
}

function levelOrder(root) {
  if (!root) return []
  const result = []
  const queue = [root]
  let index = 0
  while (index < queue.length) {
    const levelSize = queue.length - index
    const level = []
    for (let i = 0; i < levelSize; i++) {
      const node = queue[index++]
      level.push(node.id ?? node.name)
      if (node.children?.length) queue.push(...node.children)
    }
    result.push(level)
  }
  return result
}
