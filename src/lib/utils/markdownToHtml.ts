import rehypeToc from "@jsdevtools/rehype-toc";
import { Root } from "hast";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import { Transformer } from "unified";
import { visit } from "unist-util-visit";

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(anchorTargetBlank)
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeToc)
    .use(rehypePrettyCode, {
      onVisitLine(node) {
        // Prevent lines from collapsing in `display: grid` mode, and
        // allow empty lines to be copy/pasted
        if (node.children.length === 0) {
          node.children = [{ type: "text", value: " " }];
        }
      },
      theme: {
        dark: "material-default",
        light: "rose-pine-dawn",
      },
    })
    .use(remarkGfm)
    .use(headingToSementic)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}

function anchorTargetBlank(): Transformer<Root, Root> {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "a" && !!node.properties) {
        if ("href" in node.properties) {
          if (!/^#/.test(node.properties.href as string)) {
            node.properties = {
              ...node.properties,
              target: "_blank",
            };
          }
        }
      }
    });
  };
}

function headingToSementic(): Transformer<Root, Root> {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName[0] === "h") {
        const newHeadingNum =
          parseInt(node.tagName[1], 10) + 2 <= 6 ? parseInt(node.tagName[1], 10) + 2 : 6;
        node.tagName = `h${newHeadingNum}`;
      }
    });
  };
}

export async function markdownToHtmlForCache(markdown: string) {
  const result = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(remarkGfm)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}