import styled, { css, keyframes } from "styled-components";

export const LinkDecorated = styled.a`
  word-break: keep-all;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.accentColor};
    cursor: pointer;
    -webkit-transition: color 150ms linear;
    -ms-transition: color 150ms linear;
    transition: color 150ms linear;
  }
`;

export const Container = styled.div`
  width: 90vw;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  h2:target {
    scroll-margin-top: 60px;
  }
`;

export const Title = styled.strong`
  margin: 2rem 0;
  padding-bottom: 0.2rem;
  border-bottom: 3px solid #3a3e43;
  font-size: 1.4rem;
  font-weight: 700;
`;

const animatedGradientTextKeyframes = keyframes`
  to {
    background-position: 200% center;
  }
`;

export const animatedGradientTextStyle = css`
  display: inline-block;
  background-size: 200% auto;
  background-clip: text;

  text-fill-color: transparent;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  -webkit-background-clip: text;

  animation: ${animatedGradientTextKeyframes} 3s linear
    infinite;
`;
