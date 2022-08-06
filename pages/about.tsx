import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import MarkdownBody from "../components/MarkdownBody";
import { Container } from "../components/styledComponents";
import { getAboutContent } from "../lib/api";
import markdownToHtml from "../lib/markdownToHtml";

const AboutBody = styled(MarkdownBody)`
  img {
    display: inline;
  }
`;

type Props = {
  content: string;
};

const About = ({ content }: Props) => {
  return (
    <Layout>
      <Container>
        <AboutBody dangerouslySetInnerHTML={{ __html: content }} />
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
