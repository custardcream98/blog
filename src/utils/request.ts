export const getRequestBody = async <T>(request: Request): Promise<Partial<T>> => {
  const body = await request.json();
  return body;
};
