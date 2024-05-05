// TODO: 플러그인 타입 정의

import { visit } from "unist-util-visit"

const DEFAULT_START_FROM = 3

export type HeadingToStartFromOptions = {
  startFrom?: number
}
/**
 * Plugin to make all headings start from a given number.
 */
export const headingToStartFrom = (options: any) => {
  const startFrom = options?.startFrom ?? DEFAULT_START_FROM
  const offset = startFrom - 1
  return (tree: any) => {
    visit(tree, "element", (node) => {
      if (node.tagName[0] === "h") {
        const maybeNewHeadingNum = parseInt(node.tagName[1], 10) + offset
        if (isNaN(maybeNewHeadingNum)) {
          return
        }
        const newHeadingNum = Math.min(maybeNewHeadingNum, 6)
        node.tagName = `h${newHeadingNum}`
      }
    })
  }
}
