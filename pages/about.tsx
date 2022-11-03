import React from "react";
import styled from "styled-components";

import Meta from "../components/Layout/Meta";
import MarkdownBody from "../components/Common/MarkdownBody";
import { Container, Title } from "../components/Common/styledComponents";
import { getAboutContent } from "../lib/api";

import markdownToHtml from "../lib/markdownToHtml";
import check404 from "../lib/check404";

const AboutBody = styled(MarkdownBody)`
  & img {
    display: inline;
  }
`;

const AboutTitle = styled(Title)`
  font-size: 2rem;
  margin-bottom: 0;
`;

const AboutContainer = styled(Container)`
  align-items: flex-start;
`;

type Props = {
  content: string;
};

const About = ({ content }: Props) => {
  check404();

  return (
    <>
      <Meta
        title="About 개발자 박시우"
        description="안녕하세요, 삽질 좋아하는 개발자 박시우입니다. 문제가 생기면 밤을 새서라도 알아내고 해결합니다."
      />
      <AboutContainer>
        <AboutTitle as="h2">{"<개발자 박시우 />"}</AboutTitle>
        <AboutBody content={content} />
      </AboutContainer>
    </>
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
