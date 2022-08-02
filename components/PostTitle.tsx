import React from "react";
import styled from "styled-components";
import Image from "next/image";

const Title = styled.h1`
  padding-top: 2rem;
  color: ${(props) => props.theme.textColor};
  font-weight: 800;
  font-size: 2em;
  line-height: 1.25;
`;

type Props = {
  coverImage?: string;
  title: string;
};

const PostTitle = ({ coverImage, title }: Props) => {
  return (
    <div>
      {coverImage && <Image src={coverImage} layout="responsive" />}
      <Title>{title}</Title>
    </div>
  );
};

export default PostTitle;
