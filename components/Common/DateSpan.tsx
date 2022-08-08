import styled from "styled-components";

const DateSpanStyle = styled.span`
  margin-top: 0.2rem;
  font-weight: 300;
  font-size: 0.8rem;
  color: ${(props) => props.theme.subTextColor};
`;

const dateToString = (date: Date) =>
  `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

type Props = {
  date: string | number;
};

const DateSpan = ({ date, ...props }: Props) => (
  <DateSpanStyle {...props}>{dateToString(new Date(date))}</DateSpanStyle>
);

export default DateSpan;
