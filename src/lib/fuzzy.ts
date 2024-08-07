import type { SearchedPostCardDataRaw } from "src/types/searchedPosts"

import CacheDB from "cache/cache.json"

const con2syl: { [cho: string]: number } = {
  ㄱ: "가".charCodeAt(0),
  ㄲ: "까".charCodeAt(0),
  ㄴ: "나".charCodeAt(0),
  ㄷ: "다".charCodeAt(0),
  ㄸ: "따".charCodeAt(0),
  ㄹ: "라".charCodeAt(0),
  ㅁ: "마".charCodeAt(0),
  ㅂ: "바".charCodeAt(0),
  ㅃ: "빠".charCodeAt(0),
  ㅅ: "사".charCodeAt(0),
}

function ch2pattern(ch: string) {
  const offset = 44032

  if (/[가-힣]/.test(ch)) {
    const chCode = ch.charCodeAt(0) - offset

    if (chCode % 28 > 0) {
      return ch
    }
    const begin = Math.floor(chCode / 28) * 28 + offset
    const end = begin + 27
    return `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`
  }

  if (/[ㄱ-ㅎ]/.test(ch)) {
    const begin = con2syl[ch] || (ch.charCodeAt(0) - 12613) * 588 + con2syl["ㅅ"]
    const end = begin + 587
    return `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`
  }

  if (/0-9/.test(ch)) {
    return ch
  }

  return `[${ch.toUpperCase()}|${ch.toLowerCase()}]`
}
function createFuzzyMatcher(input: string) {
  const pattern = input
    .split("")
    .filter((c) => c !== " ")
    .map((c) => `(${ch2pattern(c)})`)
    .join(".{0,3}?")
  return new RegExp(pattern)
}

const findFuzzyPostData = (option: "title" | "content", regex: RegExp, exclude?: Set<string>) => {
  const results = []
  for (const postData of CacheDB) {
    if (exclude?.has(postData.slug)) {
      continue
    }
    const match = postData[option].match(regex)

    if (!match || match.index === undefined || match[0].length > 50) {
      continue
    }

    const index = match.index

    results.push({
      ...postData,
      matchLength: match[0].length,
      [option]: [
        postData[option].slice(0, index),
        match[0],
        postData[option].slice(index + match[0].length),
      ],
    })
  }

  return results
}

const TIMEOUT = 500
const findFuzzyPostDataAsync = (
  option: "title" | "content",
  regex: RegExp,
  exclude?: Set<string>,
) => {
  return Promise.race([
    new Promise<SearchedPostCardDataRaw[]>((resolve) =>
      resolve(findFuzzyPostData(option, regex, exclude)),
    ),
    new Promise<SearchedPostCardDataRaw[]>((resolve) => setTimeout(() => resolve([]), TIMEOUT)),
  ])
}

export async function getFuzzyPostData(query: string): Promise<SearchedPostCardDataRaw[]> {
  const regex = createFuzzyMatcher(query)
  const fuzzyByTitle = findFuzzyPostData("title", regex)

  const fuzzyByContent = await findFuzzyPostDataAsync(
    "content",
    regex,
    new Set(fuzzyByTitle.map((data) => data.slug)),
  )

  return [...fuzzyByTitle, ...fuzzyByContent]
    .sort((post1, post2) => new Date(post2.date).getTime() - new Date(post1.date).getTime())
    .sort((post1, post2) => post1.matchLength - post2.matchLength)
}
