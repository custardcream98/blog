import Link from "next/link";
import styled from "styled-components";
import { cssOutlineOnFocus } from "../Layout/Navigation/styles";

const StyledLink = styled.a`
  display: block;
  align-self: end;

  width: 20px;
  height: 20px;

  margin: 0 10px;

  .link-icon {
    width: 100%;
    height: 100%;
    stroke: ${({ theme }) => theme.textColor};
    :hover {
      stroke: ${({ theme }) => theme.accentColor};
    }
  }

  ${cssOutlineOnFocus}
`;

type Props = {
  slug: string;
  title: string | string[];
  closeResults: () => void;
};

export default function LinkToPost({
  slug,
  title,
  closeResults,
}: Props) {
  title =
    typeof title === "string" ? title : title.join("");

  const id = "link-icon_" + title.replaceAll(" ", "_");

  return (
    <Link href={`/posts/${slug}`} passHref>
      <StyledLink
        className="result-link"
        onClick={closeResults}
      >
        <svg
          className="link-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          aria-labelledby={id}
        >
          <title id={id}>{title} 포스트로 이동하기</title>
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </StyledLink>
    </Link>
  );
}
