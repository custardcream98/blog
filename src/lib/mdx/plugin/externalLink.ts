import { type Properties, type Root } from "hast";
import { type Plugin } from "unified";
import { visit } from "unist-util-visit";

export type ExternalLinkOptions = Properties;
/**
 * Plugin to add some properties to all links except hash links.
 */
export const externalLink: Plugin<[ExternalLinkOptions?], Root> = (options = {}) => {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "a" && !!node.properties) {
        if ("href" in node.properties) {
          const href = node.properties.href as string;
          const isHashHref = /^#/.test(href);
          if (!isHashHref) {
            node.properties = {
              ...node.properties,
              ...options,
            };
          }
        }
      }
    });
  };
};
