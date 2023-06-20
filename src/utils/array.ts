export const generateNumberArray = (length: number, startsWith = 0) => {
  return new Array(length).fill(0).map((_, index) => index + startsWith);
};

/**
 * 루프 구조의 배열에서 currentIndex에서 offset만큼 떨어진 index를 반환합니다.
 */
export const calculateLoopedIndex = (currentIndex: number, offset: number, length: number) => {
  return (currentIndex + offset + length) % length;
};
