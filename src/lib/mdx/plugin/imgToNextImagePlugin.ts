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

// 마크다운 이미지 노드 타입 정의
interface MarkdownImageNode {
  properties: {
    alt?: string
    src: string
  }
  tagName: "img"
  type: "element"
}
const isMarkdownImageNode = (node: unknown): node is MarkdownImageNode => {
  return (
    typeof node === "object" &&
    node !== null &&
    "type" in node &&
    node.type === "element" &&
    "tagName" in node &&
    node.tagName === "img"
  )
}

// 마크다운 이미지를 JSX Image로 변환
const processMarkdownImageNode = async (imageNode: MarkdownImageNode) => {
  const src = imageNode.properties.src
  if (!src) return

  // 노드 타입을 mdxJsxFlowElement로 변경
  const newNode = imageNode as unknown as MarkdownImageNode & MDXJSXNode
  newNode.name = "Image"

  // attributes 배열 생성
  const attributes: Array<{ type: string; name: string; value: unknown }> = [
    { type: "mdxJsxAttribute", name: "src", value: src },
  ]

  if (imageNode.properties.alt) {
    attributes.push({ type: "mdxJsxAttribute", name: "alt", value: imageNode.properties.alt })
  }

  // 원격 이미지인 경우 크기 정보 추가
  if (isRemoteImage(src)) {
    const stats = await fetchImageSize(src)
    if (stats?.width && stats?.height) {
      attributes.push({ type: "mdxJsxAttribute", name: "width", value: stats.width })
      attributes.push({ type: "mdxJsxAttribute", name: "height", value: stats.height })
    }
  }

  newNode.attributes = attributes

  // 노드 타입 변경
  Object.assign(newNode, {
    type: "mdxJsxFlowElement",
  })

  // 기존 properties 프로퍼티 제거
  delete (newNode as unknown as Record<string, unknown>).properties
}

export const imgToNextImagePlugin: Plugin = () => {
  return async (tree) => {
    const imageProcessingTasks: Promise<void>[] = []

    visit(tree, (node) => {
      // MDX JSX img 요소 처리
      if (node.type === "mdxJsxFlowElement") {
        const jsxNode = node as MDXJSXNode
        if (jsxNode.name === "img") {
          imageProcessingTasks.push(processImageNode(jsxNode))
        }
      }

      // 마크다운 이미지 처리 ![alt](src)
      if (isMarkdownImageNode(node)) {
        const imageNode = node as unknown as MarkdownImageNode
        imageProcessingTasks.push(processMarkdownImageNode(imageNode))
      }
    })

    await Promise.all(imageProcessingTasks)
  }
}
