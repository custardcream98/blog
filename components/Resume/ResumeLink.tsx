import { ResumeLink } from "types/resume";
import LinkSvg from "components/Common/Svgs/LinkSvg";
import SvgContainer from "components/Common/Svgs/SvgContainer";
import styled from "styled-components";

const ResumeLink = ({ url, name }: ResumeLink) => {
  return (
    <StyledResumeLink
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <SvgContainer
        svgColor="#CCC"
        svgWidth="0.95rem"
        svgHeight="0.95rem"
      >
        <LinkSvg />
      </SvgContainer>
      {name}
    </StyledResumeLink>
  );
};

const StyledResumeLink = styled.a`
  font-size: 0.9rem;
  font-weight: 300;

  border-bottom: 1px solid #ccc;
  word-break: keep-all;

  span {
    margin-right: 0.2rem;
  }
  svg {
    vertical-align: top;
    fill: #fff;
    transition: fill 0.2s ease-in-out;
  }

  transition: color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.resumeAccentColor};
    border-color: ${({ theme }) => theme.resumeAccentColor};

    svg {
      fill: ${({ theme }) => theme.resumeAccentColor};
    }
  }
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
`;

export default ResumeLink;
