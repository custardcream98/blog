import { useRouter } from "next/router";

export default function getFullURL() {
  const router = useRouter();
  return process.env.NEXT_PUBLIC_HOST + router.asPath;
}
