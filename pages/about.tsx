import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout/Layout";
import MarkdownBody from "../components/Common/MarkdownBody";
import { Container } from "../components/Common/styledComponents";
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
    <Layout
      title="About 개발자 박시우"
      description="안녕하세요, 삽질 좋아하는 개발자 박시우입니다. 문제가 생기면 밤을 새서라도 알아내고 해결합니다."
      url="about"
    >
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
