import crypto from "crypto";

/**
 * https://gist.github.com/jlevy/c246006675becc446360a798e2b2d781
 *
 * @param target 타겟 문자열
 * @returns 해시값
 */
export const hash = (target: string): string => {
  return crypto
    .createHash("shake256", { encoding: "utf-8", outputLength: 5 })
    .update(target)
    .digest("hex");
};
