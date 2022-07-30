import React from "react";
import styled from "styled-components";
import { motion, useTransform, useMotionValue } from "framer-motion";

const TitleSpan = styled(motion.span)`
  text-align: center;
  /* background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
  font-weight: 900;
  font-size: 4rem;
  line-height: 1;
  font: 800 ${(props) => props.theme.titleFont};
`;

const Title1 = styled(TitleSpan)`
  letter-spacing: -0.09rem;
  /* background-image: linear-gradient(90deg, rgb(129, 1, 188), rgb(255, 15, 163)); */
`;

const Title2 = styled(TitleSpan)`
  letter-spacing: -0.13rem;
  font-size: 4.5rem;
  /* background-image: linear-gradient(90deg, rgb(223, 56, 56), rgb(255, 200, 0)); */
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 4rem;
`;

// const titleContainerVar = {
//   start: {
//     backgroundImage:
//       "linear-gradient(90deg, rgb(129, 1, 188), rgb(255, 15, 163))",
//   },
//   end: {
//     backgroundImage: "rgb(255,255,255)",
//     transition: { duration: 1, repeat: Infinity },
//   },
// };

const title1Var = {
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
      "linear-gradient(90deg, rgb(255, 255, 255), rgb(255, 255, 255))",
      "linear-gradient(90deg, rgb(129, 1, 188), rgb(255, 15, 163))",
    ],
    transition: {
      type: "linear",
      duration: 7.5,
      repeat: Infinity,
    },
  },
};

const title2Var = {
  start: {
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundImage:
      "linear-gradient(90deg, rgb(255, 255, 255), rgb(255, 255, 255))",
  },
  end: {
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundImage: [
      "linear-gradient(90deg, rgb(255, 255, 255), rgb(255, 255, 255))",
      "linear-gradient(90deg, rgb(223, 56, 56), rgb(255, 200, 0))",
      "linear-gradient(90deg, rgb(255, 255, 255), rgb(255, 255, 255))",
    ],
    transition: {
      type: "linear",
      duration: 7.5,
      repeat: Infinity,
    },
  },
};

// const gradient1 = useMotionValue(
//   "linear-gradient(90deg, rgb(255, 255, 255), rgb(255, 255, 255))"
// );
// const gradient1Transform = useTransform(gradient1);

//     [rgb(129, 1, 188), rgb(255,255,255)]

//   )
// const gradientWhite = {
//   "background-image": "white",
//   scalef": 1
// }

// const x = useMotionvalue(0)

// const bgColor useTransform(x,[0,1])

const Intro = () => (
  <>
    <TitleContainer>
      <Title1 variants={title1Var} initial="start" animate="end">
        Dedicated to
      </Title1>
      <Title2 variants={title2Var} initial="start" animate="end">
        CODING
      </Title2>
    </TitleContainer>
  </>
);
export default Intro;
