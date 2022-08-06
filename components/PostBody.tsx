import React from "react";
import MarkdownBody from "./MarkdownBody";

type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => (
  <MarkdownBody dangerouslySetInnerHTML={{ __html: content }} />
);

export default PostBody;
