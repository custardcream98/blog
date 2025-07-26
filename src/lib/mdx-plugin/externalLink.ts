// TODO: 플러그인 타입 정의

import { visit } from "unist-util-visit"

/**
 * Plugin to add some properties to all links except hash links.
 */
export const externalLink = (options = {}) => {
  return (tree: any) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "a" && !!node.properties) {
        if ("href" in node.properties) {
          const href = node.properties.href as string
          const isHashHref = /^#/.test(href)
          if (!isHashHref) {
            node.properties = {
              ...node.properties,
              ...options,
            }
          }
        }
      }
    })
  }
}
