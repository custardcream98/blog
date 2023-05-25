const utf8Encoder = new TextEncoder();

const compareArraysDeep = <T>(a: T[], b: T[]) => {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((item, index) => item === b[index]);
};

const padZero = (str: string) => str.padStart(2, "0");

const dateToString = (date: Date) => date.toISOString().substring(0, 10);

const percentEncode = (str: string) => {
  return Array.from(utf8Encoder.encode(str))
    .map((i) => "%" + i.toString(16).toUpperCase().padStart(2, "0"))
    .join("");
};

export { compareArraysDeep, padZero, dateToString, percentEncode };
