/**
 * 回文：左右夹逼
 * 时间 O(n) 空间 O(1)
 */
function isPalindrome(str) {
  let left = 0
  let right = str.length - 1
  while (left < right) {
    if (str[left] !== str[right]) return false
    left++
    right--
  }
  return true
}

/** 忽略大小写、空格、标点 */
function isPalindromePhrase(s) {
  let left = 0
  let right = s.length - 1
  const ok = (c) => /[a-z0-9]/i.test(c)
  while (left < right) {
    while (left < right && !ok(s[left])) left++
    while (left < right && !ok(s[right])) right--
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false
    left++
    right--
  }
  return true
}

console.log(isPalindrome('level'), isPalindrome('hello'))
console.log(isPalindromePhrase('A man, a plan, a canal: Panama'))
