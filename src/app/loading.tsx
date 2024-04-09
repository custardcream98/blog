import { PageLoadingSpinner } from "./_client";

import { utld } from "utility-class-components";

export default function PageSkeleton() {
  return (
    <PageContainer>
      <PageLoadingSpinner />
    </PageContainer>
  );
}

const PageContainer = utld.div`
  mx-auto
  flex
  justify-center

  translate-y-[calc(50vh-50px-50%)]
`;
