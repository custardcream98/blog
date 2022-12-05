import { ReactNode } from "react";
import styled from "styled-components";
import Form from "./Form";
import Item from "./Item";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

type Props = {
  children: ReactNode;
};

const Comments = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

const Title = styled.h3`
  width: 100%;
  font-weight: 500;
  font-size: 1.5rem;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 3px solid #25282c;
`;

Comments.Title = Title;
Comments.Form = Form;
Comments.List = ({ children }: { children: ReactNode }) => (
  <ol>{children}</ol>
);
Comments.Item = Item;

export default Comments;
