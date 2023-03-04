import styled from "styled-components";

const LogoTitleSpan = styled.span`
  color: ${({ theme }) => theme.textColor};
  font: 800 1rem ${({ theme }) => theme.codingFont};
  letter-spacing: -0.03rem;

  @media (max-width: 800px) {
    font-size: 0.9rem;
  }
`;

export default LogoTitleSpan;
