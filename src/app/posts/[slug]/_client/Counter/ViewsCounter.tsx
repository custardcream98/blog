import { useViewsCount } from "../_hooks";

import { HiEye } from "react-icons/hi";
import { utld } from "utility-class-components";

type ViewsCounterProps = {
  title: string;
};

export function ViewsCounter({ title }: ViewsCounterProps) {
  const { views, isLoading } = useViewsCount(title);

  if (isLoading) return null;

  return (
    <CounterContainer>
      <StyledHiEye title='조회수' size={15} />
      <CounterValue>{views}</CounterValue>
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
