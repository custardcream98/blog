/**
 * https://gist.github.com/jlevy/c246006675becc446360a798e2b2d781
 *
 * @param target 타겟 문자열
 * @returns 해시값
 */
export const hash = (target: string): string => {
  let hash = 0;
  for (let i = 0; i < target.length; i++) {
    const char = target.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash;
  }
  return new Uint32Array([hash])[0].toString(36);
};
