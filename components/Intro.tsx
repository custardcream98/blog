import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { gradientTextColorSelector } from "../lib/atoms";

const TitleSpan = styled(motion.span)`
  text-align: center;
  font-weight: 900;
  font-size: 4rem;
  line-height: 1;
  font: 800 ${(props) => props.theme.titleFont};
`;

const Title1 = styled(TitleSpan)`
  letter-spacing: -0.09rem;
`;

const Title2 = styled(TitleSpan)`
  letter-spacing: -0.13rem;
  font-size: 4.5rem;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 3rem;
`;

const title1Var = (stringColor: string) => ({
  start: {
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundImage:
      "linear-gradient(90deg, rgb(129, 1, 188), rgb(255, 15, 163))",
  },
  end: {
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundImage: [
      "linear-gradient(90deg, rgb(129, 1, 188), rgb(255, 15, 163))",
      stringColor,
      "linear-gradient(90deg, rgb(129, 1, 188), rgb(255, 15, 163))",
    ],
    transition: {
      type: "linear",
      duration: 7.5,
      repeat: Infinity,
    },
  },
});

const title2Var = (stringColor: string) => ({
  start: {
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundImage: stringColor,
  },
  end: {
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundImage: [
      stringColor,
      "linear-gradient(90deg, rgb(223, 56, 56), rgb(255, 200, 0))",
      stringColor,
    ],
    transition: {
      type: "linear",
      duration: 7.5,
      repeat: Infinity,
    },
  },
});

const Intro = () => {
  const stringColor = useRecoilValue(gradientTextColorSelector);
  return (
    <>
      <TitleContainer>
        <Title1 variants={title1Var(stringColor)} initial="start" animate="end">
          Dedicated to
        </Title1>
        <Title2 variants={title2Var(stringColor)} initial="start" animate="end">
          CODING
        </Title2>
      </TitleContainer>
    </>
  );
};
export default Intro;
