import styled from "styled-components";
import { ProjectDescriptionList } from "../styles";

export const SectionItemP = styled.p`
  font-weight: 300;
  font-size: 0.9rem;
  line-height: 1.5;
  letter-spacing: 0.03em;

  margin-top: 1rem;
  & + & {
    margin-top: 0.2rem;
  }

  &:last-of-type {
    margin-bottom: 1rem;
  }
`;

export const SectionItemTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 400;
  margin: 0.8rem 0 0.5rem;
`;

export const SectionItemDescriptionList = styled(
  ProjectDescriptionList
)`
  margin-top: 0.5rem;
`;
