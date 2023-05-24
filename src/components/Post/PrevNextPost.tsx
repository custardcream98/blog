import Link from "next/link";
import styled, { css } from "styled-components";

import type PostType from "src/types/post";

type StyleProps = {
  isPrevOnly: boolean;
  isNextOnly: boolean;
};

const Container = styled.aside<StyleProps>`
  display: flex;
  width: 100%;
  margin: 2rem 0;
  justify-content: space-between;

  & div {
    width: 50%;
  }

  & div:first-child {
    ${({ isNextOnly, theme }) =>
      !isNextOnly
        ? css`
            border: 1px solid ${theme.textColor};
          `
        : css`
            border: none;
          `}
    border-radius: 4px 0 0 4px;
  }
  & div:last-child {
    ${({ isPrevOnly, theme }) =>
      !isPrevOnly
        ? css`
            border: 1px solid ${theme.textColor};
          `
        : css`
            border: none;
          `}
    ${({ isNextOnly }) =>
      !isNextOnly &&
      css`
        border-left: none;
      `};
    border-radius: 0 4px 4px 0;
    text-align: end;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    & div {
      width: 100%;
      height: 4.5rem;
      justify-content: center;
    }
    & div:first-child {
      border-radius: 4px 4px 0 0;
    }
    & div:last-child {
      ${({ isPrevOnly, theme }) =>
        !isPrevOnly
          ? css`
              border: 1px solid ${theme.textColor};
            `
          : css`
              border: none;
            `}
      ${({ isNextOnly }) =>
        !isNextOnly &&
        css`
          border-top: none;
        `};

      border-radius: 0 0 4px 4px;
      text-align: end;
    }
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  & a {
    word-break: keep-all;
  }
  & a:first-child {
    font-size: 0.8rem;
  }
  & a:last-child {
    text-overflow: ellipsis;
    margin-top: 0.4rem;
    font-size: 0.9rem;
    line-height: 1.3;
  }
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.accentColor};
    background-color: ${(props) =>
      props.theme.subTextColor};
    transition: all 150ms linear;
  }
  @media (max-width: 800px) {
    padding: 0.5rem;
    & a:first-child {
      font-size: 0.7rem;
    }
    & a:last-child {
      text-overflow: ellipsis;
      margin-top: 0.4rem;
      font-size: 0.8rem;
      line-height: 1.3;
    }
  }
`;

type Props = {
  post: PostType;
};

const PrevNextPost = ({ post }: Props) => (
  <Container
    isPrevOnly={!post.nextTitle}
    isNextOnly={!post.prevTitle}
  >
    {post.prevTitle ? (
      <LinkWrapper>
        <Link
          href={{
            pathname: "/posts/[slug]",
            query: { slug: post.prevSlug },
          }}
        >
          ← 이전글
        </Link>
        <Link
          href={{
            pathname: "/posts/[slug]",
            query: { slug: post.prevSlug },
          }}
        >
          {post.prevTitle}
        </Link>
      </LinkWrapper>
    ) : (
      <div></div>
    )}
    {post.nextTitle ? (
      <LinkWrapper>
        <Link
          href={{
            pathname: "/posts/[slug]",
            query: { slug: post.nextSlug },
          }}
        >
          다음글 →
        </Link>
        <Link
          href={{
            pathname: "/posts/[slug]",
            query: { slug: post.nextSlug },
          }}
        >
          {post.nextTitle}
        </Link>
      </LinkWrapper>
    ) : (
      <div></div>
    )}
  </Container>
);

export default PrevNextPost;
