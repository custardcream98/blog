import { dateToString } from "src/lib/utils/helper";

import { utld } from "utility-class-components";

const DateSpanStyle = utld.time`
  mt-[0.2rem]
  font-light
  text-[0.8rem]

  text-default-sub-light
  dark:text-default-sub-dark
`;

type Props = {
  date: string | number | Date;
};

function DateSpan({ date, ...props }: Props) {
  const dateString = dateToString(new Date(date));
  return <DateSpanStyle {...props}>{dateString}</DateSpanStyle>;
}

export default DateSpan;
