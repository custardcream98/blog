import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled.a`
  display: inline-block;
  align-self: end;

  width: 28px;
  height: 28px;
  #link-icon {
    width: 100%;
    height: 100%;
    stroke: ${({ theme }) => theme.textColor};
    :hover {
      stroke: ${({ theme }) => theme.accentColor};
    }
  }
`;

export default function LinkToPost({
  slug,
}: {
  slug: string;
}) {
  return (
    <Link href={`/posts/${slug}`} passHref>
      <StyledLink>
        <span className="sr-only">포스트로 이동하기</span>
        <svg
          id="link-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </StyledLink>
    </Link>
  );
}
