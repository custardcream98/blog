import { DateYYMM } from "src/types/string"

export const convertYYMMToKorean = (yymm: DateYYMM) => {
  const [year, month] = yymm.split("-")

  const yearString = year.length === 2 ? `20${year}` : year

  return `${yearString}년 ${month}월`
}

const utf8Encoder = new TextEncoder()
export const encodeToPercentString = (str: string) => {
  return Array.from(utf8Encoder.encode(str))
    .map((i) => "%" + i.toString(16).toUpperCase().padStart(2, "0"))
    .join("")
}
