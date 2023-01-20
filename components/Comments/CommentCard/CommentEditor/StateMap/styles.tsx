import { keyframes } from "styled-components";

export const keyframesShow = keyframes`
  0% {
    transform: translate(50%);
    opacity: 0;
  }
  100% {
    transform: translate(0%);
    opacity: 1;
  }
`;
