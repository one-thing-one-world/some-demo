/**
 * 根据类名寻找父元素
 * @param dom dom元素
 * @param className css类名
 * @return dom | null
 */
export function findParentByClass(dom, className) {
  if (!dom || dom.tagName === "BODY") {
    return null
  }
  if (dom.classList.contains(className)) {
    return dom
  }
  return findParentByClass(dom.parentNode, className)
}
