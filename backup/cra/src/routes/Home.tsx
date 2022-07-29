import styled from "styled-components";
import { motion } from "framer-motion";
import Navigation from "../components/Navigation";

const Wrapper = styled.div`
  padding: 0 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Container = styled.div`
  padding: 0 20px;
`;

const Title = styled(motion.span)`
  color: ${(props) => props.theme.textColor};
  font-size: 3rem;
  align-self: flex-end;
  margin-top: 0.8rem;
`;

const SubTitle = styled(motion.div)`
  color: ${(props) => props.theme.textColor};
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
`;

const Codeblock = styled.span`
  color: #bc0000;
  font-size: 1.2rem;
  border-radius: 0.7rem;
  padding: 0.4rem;
  margin: 0 0.4rem;
  background-color: #bbbbbb;
  display: flex;
  width: fit-content;
`;

const Headline = styled(motion.div)`
  display: flex;
  flex-direction: column;
  .headline__space {
    height: 3rem;
  }
`;

const headlineVariants = {
  start: {
    // x: -1000,
    opcity: 0,
    scale: 0.5,
  },
  end: {
    // x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.3,
      staggerChildren: 0.5,
    },
  },
};

const Home = () => {
  return (
    <Wrapper>
      <Navigation />
      <Container>
        <Headline variants={headlineVariants} initial="start" animate="end">
          <div className="headline__space"></div>
          <SubTitle variants={headlineVariants}>
            삽질 잘 하는
            <Codeblock>{"{ 개발자 }"}</Codeblock>
          </SubTitle>
          <Title variants={headlineVariants}>{"<박시우 />"}</Title>
        </Headline>
      </Container>
    </Wrapper>
  );
};

export default Home;
