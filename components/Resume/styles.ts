import { Container as DefaultContainer } from "components/Common/styledComponents";
import styled, { css } from "styled-components";

export const Container = styled(DefaultContainer)`
  align-items: start;

  padding-top: 6rem;

  @media only print {
    padding-top: 0rem;
    padding-bottom: 2rem;
  }
`;

export const Section = styled.section`
  margin: 4rem 0;

  color: ${({ theme }) => theme.resumeTextColor};

  @media only print {
    margin: 2rem 0;
    width: 100%;

    :last-child {
      page-break-inside: avoid;
    }
  }
`;

export const SectionTitle = styled.h3`
  font-size: 1.7rem;
  font-weight: 600;
  margin-bottom: 1.7rem;
`;

export const SectionItemList = styled.ul``;

export const SectionItem = styled.li`
  margin-top: 3rem;
  & + & {
    margin-top: 7rem;
  }

  @media only print {
    margin-top: 2rem;
    & + & {
      margin-top: 2rem;
    }
    position: relative;
    break-inside: avoid;
  }
`;

export const SectionItemBordered = styled(SectionItem)`
  list-style: none;
  padding-left: 1rem;
  border-left: 1px solid #ccc;
`;

export const ProjectTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 400;
  margin-bottom: 0.5rem;

  word-break: keep-all;
  line-height: 1.2;
`;

export const dimTextStyle = css`
  color: ${({ theme }) => theme.resumeDimTextColor};

  font-size: 0.9rem;
  font-weight: 300;

  letter-spacing: 0.02rem;
`;

export const ProjectTeam = styled.span`
  ${dimTextStyle}

  margin-bottom: 0.2rem;
  display: block;

  word-break: keep-all;
  line-height: 1.2;
`;

export const ProjectShortDescription = styled.p`
  margin-top: 1rem;

  font-weight: 300;
  font-size: 0.9rem;

  line-height: 1.6;

  letter-spacing: 0.04em;
`;

export const ProjectDescriptionList = styled.ul`
  margin-top: 1.5rem;

  font-weight: 300;
  font-size: 0.9rem;

  letter-spacing: 0.03em;
  line-height: 1.5;

  @media only print {
    margin-top: 0.5rem;
  }
`;

export const ProjectDescriptionItem = styled.li`
  margin: 0.4rem 0 0.4rem 0.4rem;
  padding-left: 0.6rem;

  ::marker {
    content: "-";

    font-size: 1rem;
    font-weight: 600;

    color: ${({ theme }) => theme.resumeAccentColor};
  }

  @media only print {
    margin: 0.2rem 0 0.2rem 0.2rem;
  }
`;

export const ProjectStacks = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

export const ProjectStack = styled.li`
  font-size: 0.8rem;
  font-weight: 300;

  padding: 0.2rem 0.4rem;
  border-radius: 0.2rem;

  color: ${({ theme }) => theme.resumeBadgeTextColor};
  background-color: ${({ theme }) =>
    theme.resumeBadgeBackgroundColor};
`;
