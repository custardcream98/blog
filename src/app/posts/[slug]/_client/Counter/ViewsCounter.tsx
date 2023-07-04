import { useGetPostViewsQuery } from "src/request";

import { HiEye } from "react-icons/hi";
import { utld } from "utility-class-components";

type ViewsCounterProps = {
  title: string;
};

export function ViewsCounter({ title }: ViewsCounterProps) {
  const { data: viewsData } = useGetPostViewsQuery(title);
  const isViewCountLoaded = viewsData !== undefined;

  if (!isViewCountLoaded) return null;

  return (
    <CounterContainer>
      <StyledHiEye title='조회수' size={15} />
      {isViewCountLoaded && <CounterValue>{viewsData.views}</CounterValue>}
    </CounterContainer>
  );
}

const StyledHiEye = utld(HiEye)`
  text-default-sub-light
  dark:text-default-sub-dark
`;

const CounterContainer = utld.em`
  ml-2
  flex
  items-center

  min-w-[2.3125rem]
`;

const CounterValue = utld.span`
  ml-[0.3rem]
  text-[1rem]
  font-light

  text-default-sub-light
  dark:text-default-sub-dark
`;
