const compareArraysDeep = (a: any[], b: any[]) => {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((item, index) => item === b[index]);
};

const padZero = (str: string) => str.padStart(2, "0");

const dateToString = (date: Date) =>
  date.toISOString().substring(0, 10);

export { compareArraysDeep, padZero, dateToString };
