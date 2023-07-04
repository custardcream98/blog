import { useLocalStorageState } from "src/hook";

import { getPostViews } from "../axios";
import { getUseGetPostViewsQueryKey } from "../query-keys";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const REFETCH_INTERVAL = 10_000;
const LOCALSTORAGE_LAST_VIEWED_KEY = "lastViewed";

export const useGetPostViewsQuery = (title: string) => {
  const LOCALSTORAGE_KEY = `${LOCALSTORAGE_LAST_VIEWED_KEY}-${title}`;

  const [viewedAt, setViewedAt] = useLocalStorageState<number | undefined>(
    LOCALSTORAGE_KEY,
    undefined,
  );
  const [isRefatching, setIsRefatching] = useState(false);

  return useQuery({
    onSuccess: ({ isIncreased }) => {
      if (isIncreased) {
        setViewedAt(Date.now());
      } else if (!isRefatching) {
        setIsRefatching(true);
      }
    },
    queryFn: () => getPostViews({ title, viewedAt: !isRefatching ? viewedAt : Date.now() }),
    queryKey: getUseGetPostViewsQueryKey(title),
    refetchInterval: REFETCH_INTERVAL,
  });
};
