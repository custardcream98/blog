import type { Root } from "mdast"

import { toc } from "mdast-util-toc"

import "./tableOfContents.css"
import { Plugin } from "unified"
import { Node as UnistNode, Parent } from "unist"
import { visit } from "unist-util-visit"

const TABLE_OF_CONTENTS_ID = "table-of-contents"

/** toc를 생성하는 remark plugin */
export const tableOfContents = () => {
  return (tree: Root) => {
    const { map } = toc(tree)

    if (!map) {
      return
    }

    map.data = {
      ...map.data,
      hProperties: {
        id: TABLE_OF_CONTENTS_ID,
      },
    }

    tree.children = [map, ...tree.children]
  }
}

type TableOfContentsNode = UnistNode & {
  type: "element"
  tagName: "ul"
  properties: {
    id?: string
  }
  children: UnistNode[]
}

const isTableOfContentsNode = (node: UnistNode): node is TableOfContentsNode => {
  return (
    node.type === "element" &&
    (node as TableOfContentsNode).tagName === "ul" &&
    (node as TableOfContentsNode).properties.id === TABLE_OF_CONTENTS_ID
  )
}

/** toc를 nav로 감싸는 rehype plugin */
export const wrapTableOfContents: Plugin = () => {
  return (tree) => {
    visit(tree, (node, index, parent) => {
      if (isTableOfContentsNode(node) && parent && typeof index === "number") {
        const ul = node
        delete ul.properties?.id

        const nav = {
          type: "element",
          tagName: "nav",
          properties: { id: TABLE_OF_CONTENTS_ID },
          children: [ul],
        } as const

        ;(parent as Parent).children[index] = nav
      }
    })
  }
}
