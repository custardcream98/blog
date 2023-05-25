import { DateYYMM } from "src/types/string";

export const convertYYMMToKorean = (yymm: DateYYMM) => {
  const [year, month] = yymm.split("-");

  const yearString = year.length === 2 ? `20${year}` : year;

  return `${yearString}년 ${month}월`;
};

export const isNotEmptyString = (value: unknown) =>
  !!value && value !== "\n" && value !== "\t" && value !== "\r";
