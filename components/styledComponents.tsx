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

export const DateSpan = styled.span`
  margin-top: 0.2rem;
  font-weight: 300;
  font-size: 0.8rem;
  color: ${(props) => props.theme.subTextColor};
`;
