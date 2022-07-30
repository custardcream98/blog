import React from "react";
import styled from "styled-components";
import Navigation from "../components/Navigation";
import Intro from "../components/Intro";
import Post from "../interfaces/post";

const Container = styled.div`
  width: 85vw;
  max-width: 800px;
  display: flex;
  justify-content: center;
  padding-top: 2rem;
  margin: 0 auto auto;
`;

const IntroParagraph = styled.p`
  line-height: 1.75;
  font-size: 0.8rem;
  color: ${(props) => props.theme.subTextColor};
`;

type Props = {
  allPosts: Post[];
};

const Home = ({ allPosts }: Props) => {
  return (
    <>
      <Navigation />
      <Intro />
      <Container>
        <IntroParagraph>
          예쁘고 간결한 것을 정말 좋아하는 개발자 박시우의 블로그입니다.
          <br />
          공부한 것들, 공유하고 싶은 내용을 올립니다.
        </IntroParagraph>
      </Container>
    </>
  );
};

export default Home;
