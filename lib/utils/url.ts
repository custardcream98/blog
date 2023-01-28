import { useRouter } from "next/router";

const resolveURL = (url: string) => {
  return process.env.NEXT_PUBLIC_HOST + url;
};

const getFullURL = () => {
  const router = useRouter();
  return resolveURL(router.asPath);
};

export { resolveURL, getFullURL };
