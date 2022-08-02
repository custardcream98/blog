import { remark } from 'remark'
import remarkRehype from "remark-rehype";
import remarkAttr from "remark-attr"
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(remarkAttr.remarkAttr).use(remarkRehype).use(rehypePrettyCode).use(rehypeStringify).process(markdown)
  return result.toString()
}
