import { unstable_cache } from "next/cache"

export const cache =
  process.env.NODE_ENV === "development"
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (((fn: any) => fn) as typeof unstable_cache)
    : unstable_cache
