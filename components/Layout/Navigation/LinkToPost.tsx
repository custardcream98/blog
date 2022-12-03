import Link from "next/link";
import {
  KeyboardEvent,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
import styled from "styled-components";
import SearchbarStore from "./SearchbarStore";

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
`;

export default function LinkToPost({
  slug,
  title,
  isLast,
}: {
  slug: string;
  title: string;
  isLast: boolean;
}) {
  const id = "link-icon_" + title.replaceAll(" ", "_");
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { closeResults } = useContext(SearchbarStore);

  const blurLastItemCallback = useCallback(() => {
    const searchInputEle = document.querySelector(
      "#search"
    ) as HTMLInputElement;

    searchInputEle.focus();
  }, []);

  const onEnterKeyDownCallback = useCallback(
    (event: KeyboardEvent) => {
      if (event.code !== "Enter") {
        return;
      }
      return closeResults;
    },
    []
  );

  useLayoutEffect(() => {
    if (isLast) {
      linkRef.current?.addEventListener(
        "blur",
        blurLastItemCallback
      );

      return () =>
        linkRef.current?.removeEventListener(
          "blur",
          blurLastItemCallback
        );
    }
  }, [isLast]);

  return (
    <Link href={`/posts/${slug}`} passHref>
      <StyledLink
        ref={linkRef}
        onClick={closeResults}
        onKeyDown={onEnterKeyDownCallback}
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
