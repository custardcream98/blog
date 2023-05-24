import { css } from "styled-components";

export const cssOutlineOnFocus = css`
  :focus {
    outline: 2px solid ${({ theme }) => theme.accentColor};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;
