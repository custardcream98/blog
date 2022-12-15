import { useLayoutEffect, useState } from "react";
import styled from "styled-components";

const DateSpanStyle = styled.time`
  margin-top: 0.2rem;
  font-weight: 300;
  font-size: 0.8rem;
  color: ${(props) => props.theme.subTextColor};
`;

const padZero = (str: string) => str.padStart(2, "0");

const dateToString = (date: Date) =>
  `${date.getFullYear()}-${padZero(
    (date.getMonth() + 1).toString()
  )}-${padZero(date.getDate().toString())}`;

type Props = {
  date: string | number;
};

const DateSpan = ({ date, ...props }: Props) => {
  const [dateString, setDateString] = useState("");

  useLayoutEffect(() => {
    setDateString(dateToString(new Date(date)));
  }, [date]);

  return (
    <DateSpanStyle {...props}>{dateString}</DateSpanStyle>
  );
};

export default DateSpan;
