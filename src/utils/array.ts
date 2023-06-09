export const generateNumberArray = (length: number, startsWith = 0) => {
  return new Array(length).fill(0).map((_, index) => index + startsWith);
};
