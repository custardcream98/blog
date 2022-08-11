import { remark } from 'remark'
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug"
import rehypeToc from '@jsdevtools/rehype-toc'
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(remarkRehype).use(rehypeSlug).use(rehypeToc).use(rehypePrettyCode).use(rehypeStringify).process(markdown)
  return result.toString()
}
