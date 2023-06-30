import { NextApiResponse } from "./_types";

export const normalizeNextApiResponse = <T>(rawData: NextApiResponse<T>) => {
  return rawData.data;
};
