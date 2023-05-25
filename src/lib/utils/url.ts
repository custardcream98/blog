const resolveURL = (url: string) => {
  return process.env.NEXT_PUBLIC_HOST + url;
};

export { resolveURL };
