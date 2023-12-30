import type { Simplify } from "src/types/helper";
import { dateToString } from "src/utils";

import { utld } from "utility-class-components";

const DateSpanStyle = utld.time`
  mt-[0.2rem]
  font-light
  text-[0.8rem]

  text-default-sub-light
  dark:text-default-sub-dark
`;

type DateSpanProps = Simplify<
  Omit<React.ComponentPropsWithoutRef<"time">, "dateTime" | "children"> & {
    dateTime: string | number;
  }
>;

export function DateSpan({ dateTime, ...props }: DateSpanProps) {
  const date = new Date(dateTime);
  const dateString = dateToString(date);
  return (
    <DateSpanStyle dateTime={date.toISOString()} {...props}>
      {dateString}
    </DateSpanStyle>
  );
}
