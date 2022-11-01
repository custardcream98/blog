import Link from "next/link";
import styled from "styled-components";

const SeriesTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 500;
`;

const SeriesLink = styled(Link)`
  text-decoration: none;
  color: white;
  transition: linear 0.3s;
  -webkit-transition: linear 0.3s;
  -moz-transition: linear 0.3s;
  &:hover {
    color: #1e1e1e;
    background-color: #dedede;
  }
`;

const PostSeries = () => {
  return (
    <section>
      <SeriesTitle className="sr-only">이 시리즈의 글</SeriesTitle>
      <ol>{}</ol>
    </section>
  );
};

export default PostSeries;
