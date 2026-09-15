/** 二叉树 · visit 放在哪决定前/中/后序 */

function preorder(root) {
  const result = []
  function dfs(node) {
    if (!node) return
    result.push(node.val)
    dfs(node.left)
    dfs(node.right)
  }
  dfs(root)
  return result
}

function inorder(root) {
  const result = []
  function dfs(node) {
    if (!node) return
    dfs(node.left)
    result.push(node.val)
    dfs(node.right)
  }
  dfs(root)
  return result
}

function postorder(root) {
  const result = []
  function dfs(node) {
    if (!node) return
    dfs(node.left)
    dfs(node.right)
    result.push(node.val)
  }
  dfs(root)
  return result
}

function maxDepth(root) {
  if (!root) return 0
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right))
}

function invertTree(root) {
  if (!root) return null
  const temp = root.left
  root.left = root.right
  root.right = temp
  invertTree(root.left)
  invertTree(root.right)
  return root
}
