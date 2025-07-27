import type { Plugin } from "unified"

import { imageSize } from "image-size"
import { visit } from "unist-util-visit"

// MDX JSX 노드 타입 정의
interface MDXJSXNode {
  attributes?: Array<{
    type: string
    name: string
    value: unknown
  }>
  name?: string
}

// 원격 이미지 크기 측정
const fetchImageSize = async (src: string) => {
  try {
    const response = await fetch(src)
    const arrayBuffer = await response.arrayBuffer()
    return imageSize(new Uint8Array(arrayBuffer))
  } catch (error) {
    console.warn(`Failed to fetch image: ${src}`, error)
    return null
  }
}

// 원격 이미지 URL 확인
const isRemoteImage = (src: string): boolean =>
  src.startsWith("https://") || src.startsWith("http://")

// MDX JSX img 요소를 Image 컴포넌트로 변환
const processImageNode = async (jsxNode: MDXJSXNode) => {
  const srcAttr = jsxNode.attributes?.find((attr) => attr.name === "src")
  if (!srcAttr?.value) return

  const src = srcAttr.value as string
  jsxNode.name = "Image"

  if (isRemoteImage(src)) {
    const stats = await fetchImageSize(src)
    if (stats?.width && stats?.height) {
      const attributes = jsxNode.attributes!
      if (!attributes.find((attr) => attr.name === "width")) {
        attributes.push({ type: "mdxJsxAttribute", name: "width", value: stats.width })
      }
      if (!attributes.find((attr) => attr.name === "height")) {
        attributes.push({ type: "mdxJsxAttribute", name: "height", value: stats.height })
      }
    }
  }
}

export const remoteImagePlugin: Plugin = () => {
  return async (tree) => {
    const imageProcessingTasks: Promise<void>[] = []

    visit(tree, (node) => {
      if (node.type === "mdxJsxFlowElement") {
        const jsxNode = node as MDXJSXNode
        if (jsxNode.name === "img") {
          imageProcessingTasks.push(processImageNode(jsxNode))
        }
      }
    })

    await Promise.all(imageProcessingTasks)
  }
}
