import LinkSvg from "src/components/Common/Svgs/LinkSvg";
import SvgContainer from "src/components/Common/Svgs/SvgContainer";
import { ResumeLink } from "src/types/resume";

import styled, { css } from "styled-components";

function ResumeLink({ url, name }: ResumeLink) {
  return (
    <StyledResumeLink href={url} target='_blank' rel='noopener noreferrer'>
      <SvgContainer svgWidth='0.95rem' svgHeight='0.95rem'>
        <LinkSvg />
      </SvgContainer>
      {name}
    </StyledResumeLink>
  );
}

export const iconClickableStyle = css`
  font-size: 0.9rem;
  font-weight: 300;

  border-bottom: 1px solid ${({ theme }) => theme.resumeTextColor};
  word-break: keep-all;

  transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out;

  span {
    margin-right: 0.2rem;
  }
  svg {
    vertical-align: top;
    fill: ${({ theme }) => theme.resumeTextColor};
    transition: fill 0.2s ease-in-out;
  }

  &:hover {
    color: ${({ theme }) => theme.resumeAccentColor};
    border-color: ${({ theme }) => theme.resumeAccentColor};

    svg {
      fill: ${({ theme }) => theme.resumeAccentColor};
    }
  }
`;

const StyledResumeLink = styled.a`
  ${iconClickableStyle}
`;

export const ResumeLinksList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  margin-bottom: 0.8rem;
  margin-top: 1rem;
  ul + & {
    margin-top: 2rem;
  }

  @media only print {
    margin-top: 0.8rem;
    ul + & {
      margin-top: 0.8rem;
    }

    :last-child {
      margin-top: 0.5rem;
    }
  }
`;

export default ResumeLink;
