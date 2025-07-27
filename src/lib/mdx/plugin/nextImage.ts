import type { Plugin } from "unified"

import { imageSize } from "image-size"
import { StaticImageData } from "next/image"
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

// HTML 요소 노드 타입 정의
interface HTMLElementNode {
  properties?: { src?: string; alt?: string; [key: string]: unknown }
  tagName: string
}

// JSX 노드 타입 정의
interface JSXNode {
  value: string
}

const FILE_NAME_CHAR = '[\\", \\.\\/-\\w]'
const MULTI_IMAGE_SRC_RE = new RegExp(` src=\\{\\[(${FILE_NAME_CHAR}+)\\]\\}`)
const SINGLE_IMAGE_SRC_RE = new RegExp(` src=\\"(${FILE_NAME_CHAR}+)\\"`)

// JSX 문자열에서 src 배열 추출
const extractSrcSet = (jsxValue: string): string[] => {
  const singleMatch = SINGLE_IMAGE_SRC_RE.exec(jsxValue)
  if (singleMatch) return [singleMatch[1]]

  const multiMatch = MULTI_IMAGE_SRC_RE.exec(jsxValue)
  if (multiMatch) {
    return multiMatch[1].split(",").map((path) => path.trim().replaceAll('"', ""))
  }

  throw new Error(`Failed to extract src set: ${jsxValue}`)
}

// JSX 문자열에서 요소 타입 추출
const getElementType = (jsxValue: string): string => {
  const match = /^<(\w+) /.exec(jsxValue)
  return match?.[1] ?? ""
}

// JSX 문자열의 src 교체
const replaceSrcSet = (jsxValue: string, newSrcSet: Array<StaticImageData | string>): string => {
  const newSrcProp = ` src={${JSON.stringify(newSrcSet)}}`

  if (SINGLE_IMAGE_SRC_RE.test(jsxValue)) {
    return jsxValue.replace(SINGLE_IMAGE_SRC_RE, newSrcProp)
  }
  if (MULTI_IMAGE_SRC_RE.test(jsxValue)) {
    return jsxValue.replace(MULTI_IMAGE_SRC_RE, newSrcProp)
  }

  return jsxValue
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

// MDX JSX img 요소 처리
const processMDXJSXImage = async (jsxNode: MDXJSXNode) => {
  const srcAttr = jsxNode.attributes?.find((attr) => attr.name === "src")
  if (!srcAttr?.value) return

  const src = srcAttr.value as string
  jsxNode.name = "Image"

  if (isRemoteImage(src)) {
    const stats = await fetchImageSize(src)
    if (stats?.width && stats?.height) {
      // width, height 속성 추가
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

// HTML img 요소 처리
const processHTMLImage = async (imgNode: HTMLElementNode) => {
  const src = imgNode.properties?.src
  if (!src) return

  imgNode.tagName = "Image"

  if (isRemoteImage(src)) {
    const stats = await fetchImageSize(src)
    if (stats?.width && stats?.height) {
      imgNode.properties = {
        ...imgNode.properties,
        width: stats.width,
        height: stats.height,
        src,
      }
    }
  }
}

// JSX 컴포넌트 처리
const processJSXComponent = async (jsxNode: JSXNode) => {
  if (!["Image", "img"].includes(getElementType(jsxNode.value))) return

  const srcSet = extractSrcSet(jsxNode.value)
  const staticImageData: Array<StaticImageData | string> = []

  for (const src of srcSet) {
    if (isRemoteImage(src)) {
      const stats = await fetchImageSize(src)
      if (stats?.width && stats?.height) {
        staticImageData.push({
          height: stats.height,
          width: stats.width,
          src,
        })
      } else {
        staticImageData.push(src)
      }
    } else {
      staticImageData.push(src)
    }
  }

  jsxNode.value = replaceSrcSet(jsxNode.value, staticImageData)
}

export const remoteImagePlugin: Plugin = () => {
  return async (tree) => {
    const imageProcessingTasks: Promise<void>[] = []

    visit(tree, (node) => {
      // MDX JSX img 요소 처리
      if (node.type === "mdxJsxFlowElement") {
        const jsxNode = node as MDXJSXNode
        if (jsxNode.name === "img") {
          imageProcessingTasks.push(processMDXJSXImage(jsxNode))
        }
        return
      }

      // HTML img 요소 처리
      if (node.type === "element" && (node as { tagName?: string }).tagName === "img") {
        const imgNode = node as unknown as HTMLElementNode
        imageProcessingTasks.push(processHTMLImage(imgNode))
        return
      }

      // JSX 컴포넌트 처리
      if (node.type === "jsx") {
        const jsxNode = node as unknown as JSXNode
        imageProcessingTasks.push(processJSXComponent(jsxNode))
      }
    })

    await Promise.all(imageProcessingTasks)
  }
}
