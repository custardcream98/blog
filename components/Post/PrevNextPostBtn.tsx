import Link from "next/link";
import styled from "styled-components";
import PostType from "../../interfaces/post";

type StyleProps = {
  isPrevOnly: boolean;
  isNextOnly: boolean;
};

const Container = styled.section<StyleProps>`
  display: flex;
  width: 100%;
  margin: 2rem 0;
  justify-content: space-between;

  & div {
    width: 50%;
  }
  & div:first-child {
    border: ${(props) =>
      !props.isNextOnly ? `1px solid ${props.theme.textColor}` : "none"};
    border-radius: 4px 0 0 4px;
  }
  & div:last-child {
    border: ${(props) =>
      !props.isPrevOnly ? `1px solid ${props.theme.textColor}` : "none"};
    border-left: ${(props) => (props.isNextOnly ? "" : "none")};
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
      border: ${(props) =>
        !props.isNextOnly ? `1px solid ${props.theme.textColor}` : "none"};
      border-radius: 4px 4px 0 0;
    }
    & div:last-child {
      border: ${(props) =>
        !props.isPrevOnly ? `1px solid ${props.theme.textColor}` : "none"};
      border-top: ${(props) => (props.isNextOnly ? "" : "none")};
      border-radius: 0 0 4px 4px;
      text-align: end;
    }
  }
`;

const Btn = styled.div`
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
    background-color: ${(props) => props.theme.subTextColor};
    -webkit-transition: all 150ms linear;
    -ms-transition: all 150ms linear;
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

const PrevNextPostBtn = ({ post }: Props) => (
  <Container isPrevOnly={!post.nextTitle} isNextOnly={!post.prevTitle}>
    {post.prevTitle ? (
      <Btn>
        <Link href={`../posts/${post.prevSlug}`}>← 이전글</Link>
        <Link href={`../posts/${post.prevSlug}`}>{post.prevTitle}</Link>
      </Btn>
    ) : (
      <div></div>
    )}
    {post.nextTitle ? (
      <Btn>
        <Link href={`../posts/${post.nextSlug}`}>다음글 →</Link>
        <Link href={`../posts/${post.nextSlug}`}>{post.nextTitle}</Link>
      </Btn>
    ) : (
      <div></div>
    )}
  </Container>
);

export default PrevNextPostBtn;
