import { convertYYMMToKorean } from "lib/utils/string";
import type { Period } from "types/resume";
import styled from "styled-components";
import { dimTextStyle } from "./styles";

const ResumePeriod = ({ from, to }: Period) => {
  if (to) {
    if (from === to) {
      return (
        <ResumePeriodContainer>
          <time dateTime={from}>
            {convertYYMMToKorean(from)}
          </time>
        </ResumePeriodContainer>
      );
    }

    return (
      <ResumePeriodContainer>
        <time dateTime={from}>
          {convertYYMMToKorean(from)}
        </time>
        <time dateTime={to}>{convertYYMMToKorean(to)}</time>
      </ResumePeriodContainer>
    );
  }

  return (
    <ResumePeriodContainer>
      <time dateTime={from}>
        {convertYYMMToKorean(from)}
      </time>
      <span>진행중</span>
    </ResumePeriodContainer>
  );
};

export const ResumePeriodContainer = styled.span`
  ${dimTextStyle}
  display: inline-block;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;

  time:first-child {
    + time,
    + span {
      ::before {
        content: "~";
        margin: 0 0.3rem;
      }
    }
  }
`;

export default ResumePeriod;
