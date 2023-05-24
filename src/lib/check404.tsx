import { useRouter } from "next/router";
import ErrorPage from "next/error";

const check404 = () => {
  const router = useRouter();
  if (!router.isFallback) {
    return <ErrorPage statusCode={404} />;
  }
};

export default check404;
