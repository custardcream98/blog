import styled from "styled-components";

export const LinkDecorated = styled.a`
  word-break: keep-all;
  &:hover {
    text-decoration: underline;
    color: ${(props) => props.theme.accentColor};
    cursor: pointer;
    -webkit-transition: color 150ms linear;
    -ms-transition: color 150ms linear;
    transition: color 150ms linear;
  }
`;

export const Container = styled.div`
  width: 85vw;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto auto;
`;
