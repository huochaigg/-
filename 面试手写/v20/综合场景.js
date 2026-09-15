/**
 * 综合场景 · 30 秒定模型，不必一次写完美业务代码
 *
 * 1 菜单面包屑 routeId → DFS + path + 回溯（findPath）
 * 2 组织架构按层 → BFS + Queue + levelSize
 * 3 模块依赖 A→B→C→A → 图环：visited / DFS 或 链表 Floyd 的「环」意识
 * 4 Undo → Stack；Redo → 两个栈
 */

function findBreadcrumb(tree, routeId) {
  const path = []
  const dfs = (nodes) => {
    for (const node of nodes || []) {
      path.push(node.name)
      if (node.id === routeId) return true
      if (node.children?.length && dfs(node.children)) return true
      path.pop()
    }
    return false
  }
  return dfs(tree) ? [...path] : null
}

function orgByLevel(root) {
  if (!root) return []
  const result = []
  const queue = [root]
  let i = 0
  while (i < queue.length) {
    const size = queue.length - i
    const level = []
    for (let k = 0; k < size; k++) {
      const node = queue[i++]
      level.push(node.name)
      if (node.children?.length) queue.push(...node.children)
    }
    result.push(level)
  }
  return result
}

function hasDepCycle(graph) {
  const visited = new Set()
  const onPath = new Set()
  const dfs = (u) => {
    if (onPath.has(u)) return true
    if (visited.has(u)) return false
    visited.add(u)
    onPath.add(u)
    for (const v of graph[u] || []) {
      if (dfs(v)) return true
    }
    onPath.delete(u)
    return false
  }
  return Object.keys(graph).some(dfs)
}

class UndoRedo {
  constructor() {
    this.undoStack = []
    this.redoStack = []
  }
  exec(op) {
    this.undoStack.push(op)
    this.redoStack.length = 0
  }
  undo() {
    if (!this.undoStack.length) return
    this.redoStack.push(this.undoStack.pop())
  }
  redo() {
    if (!this.redoStack.length) return
    this.undoStack.push(this.redoStack.pop())
  }
}
