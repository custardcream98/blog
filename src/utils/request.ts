export const getRequestBody = async <T>(request: Request): Promise<Partial<T>> => {
  const body = await request.json();
  return body;
};

export const parseSearchParams = <T>(url: string): Partial<T> => {
  const searchParams = new URL(url).searchParams;
  const params = Object.fromEntries(searchParams.entries());
  return params as Partial<T>;
};
