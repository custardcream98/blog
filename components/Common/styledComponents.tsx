import styled from "styled-components";

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
  margin: 0 auto auto;

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

export const SearchButton = styled.button`
  width: 26px;
  height: 26px;
  margin-left: 0.25rem;
  padding: 0;

  border: none;
  cursor: pointer;

  transition: scale 0.2s ease;
  background: none;

  :hover {
    scale: 1.1;
  }
  :active {
    scale: 0.8;
  }
  @media (max-width: 800px) {
    width: 22px;
    height: 22px;
  }
`;
