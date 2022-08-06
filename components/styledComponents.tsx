import styled from "styled-components";

export const LinkDecorated = styled.a`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
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
