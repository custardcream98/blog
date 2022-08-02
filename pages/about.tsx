import React from "react";
import Layout from "../components/Layout";
import PostBody from "../components/PostBody";
import { Container } from "../components/styledComponents";
import { getAboutContent } from "../lib/api";
import markdownToHtml from "../lib/markdownToHtml";

type Props = {
  content: string;
};

const About = ({ content }: Props) => {
  return (
    <Layout>
      <Container>
        <PostBody content={content} />
      </Container>
    </Layout>
  );
};

export default About;

export async function getStaticProps() {
  const aboutContent = getAboutContent();
  const content = await markdownToHtml(aboutContent);

  return {
    props: { content },
  };
}
