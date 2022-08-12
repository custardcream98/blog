import React from "react";
import Layout from "../components/Layout/Layout";
import categoryTheme from "../lib/categoryTheme";
import { Container, Title } from "../components/Common/styledComponents";
import Badge, { BadgeContainer } from "../components/Common/CategoryBadge";

const Categories = () => {
  return (
    <Layout title="Categories" url="categories">
      <Container>
        <Title>{`<Categories />`}</Title>
        <BadgeContainer>
          {React.Children.toArray(
            Object.keys(categoryTheme).map((c) => <Badge category={c} />)
          )}
        </BadgeContainer>
      </Container>
    </Layout>
  );
};

export default Categories;
