import fs from "fs";
import sizeOf from "image-size";
import path from "path";
import { visit } from "unist-util-visit";

const ROOT_PATH = path.join(process.cwd(), "public");

const getImgSize = (src: string) => {
  const filePath = path.join(ROOT_PATH, src);

  const imageFile = fs.readFileSync(filePath);

  return sizeOf(imageFile);
};

type ImgMdxJsxElement = {
  type: "mdxJsxFlowElement";
  name: "img";
  attributes: {
    name: string;
    type: "mdxJsxAttribute";
    value: string;
  }[];
};

/**
 * Plugin to add image dimensions to `img` tags
 */
export const imageSize = (options: any) => {
  const mdxJsxElementTagNameSet = new Set(options?.mdxJsxElementTagName ?? ["img"]);

  return (tree: any) => {
    visit(tree, (node) => {
      if (node.type === "element" && node.tagName === "img" && node.properties) {
        if ("src" in node.properties) {
          const src = decodeURIComponent(node.properties.src as string);

          const { height, width } = getImgSize(src);

          node.properties.height = height;
          node.properties.width = width;

          return;
        }
      }

      if (
        (node as unknown as ImgMdxJsxElement).type === "mdxJsxFlowElement" &&
        mdxJsxElementTagNameSet.has((node as unknown as ImgMdxJsxElement).name)
      ) {
        const attributes = (node as unknown as ImgMdxJsxElement).attributes;

        const src = attributes.find((attribute) => attribute.name === "src")?.value;

        if (!src) {
          return;
        }

        const { height, width } = getImgSize(src);

        attributes.push({
          name: "height",
          type: "mdxJsxAttribute",
          value: (height ?? 0).toString(),
        });

        attributes.push({
          name: "width",
          type: "mdxJsxAttribute",
          value: (width ?? 0).toString(),
        });
      }
    });
  };
};
