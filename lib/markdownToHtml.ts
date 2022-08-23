import { remark } from 'remark';
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeToc from '@jsdevtools/rehype-toc';
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import { visit } from 'unist-util-visit';
import { Root } from 'hast'
import { Transformer } from "unified";

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(remarkRehype, {allowDangerousHtml:true}).use(anchorTargetBlank).use(rehypeRaw).use(rehypeSlug).use(rehypeToc).use(rehypePrettyCode).use(rehypeStringify).process(markdown)
  return result.toString()
}

function anchorTargetBlank():Transformer<Root, Root> {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'a') {
        node.properties = { ...node.properties, target: "_blank" };
      }
    })
  }
}
