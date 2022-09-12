import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeToc from "@jsdevtools/rehype-toc";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import { Root } from "hast";
import { Transformer } from "unified";

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(anchorTargetBlank)
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeToc)
    .use(rehypePrettyCode)
    .use(remarkGfm)
    .use(headingToSementic)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}

function anchorTargetBlank(): Transformer<Root, Root> {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "a") {
        node.properties = { ...node.properties, target: "_blank" };
      }
    });
  };
}

function headingToSementic(): Transformer<Root, Root> {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName[0] === "h") {
        const newHeadingNum =
          parseInt(node.tagName[1]) + 2 <= 6
            ? parseInt(node.tagName[1]) + 2
            : 6;
        node.tagName = `h${newHeadingNum}`;
      }
    });
  };
}
