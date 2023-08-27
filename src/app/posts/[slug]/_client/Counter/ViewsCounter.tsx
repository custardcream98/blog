import { useGetPostViewsQuery } from "src/request";

import { LoadingIndicator } from "./LoadingIndicator";

import { HiEye } from "react-icons/hi";
import { utld } from "utility-class-components";

type ViewsCounterProps = {
  title: string;
};

export function ViewsCounter({ title }: ViewsCounterProps) {
  const { data: viewsData } = useGetPostViewsQuery(title);
  const isViewCountLoaded = viewsData?.views !== undefined;

  return (
    <CounterContainer>
      <StyledHiEye title='조회수' size={15} className='mr-1' />
      {isViewCountLoaded ? <CounterValue>{viewsData.views}</CounterValue> : <LoadingIndicator />}
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

  min-w-[4rem]

  px-2
  rounded-full

  border-[1px]
  border-solid
  border-text-default-light
  dark:border-text-default-dark
`;

const CounterValue = utld.span`
  mx-auto
  text-[1rem]
  font-light

  text-default-sub-light
  dark:text-default-sub-dark
`;
