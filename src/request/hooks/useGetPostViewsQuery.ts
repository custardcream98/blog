import { useLocalStorageState } from "src/hook";

import { getPostViews } from "../axios";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const USE_GET_POST_VIEWS_QUERY_KEY = "views";
const LOCALSTORAGE_LAST_VIEWED_KEY = "lastViewed";

const getUseGetPostViewsQueryKey = (title: string) => [USE_GET_POST_VIEWS_QUERY_KEY, title];

export const useGetPostViewsQuery = (title: string) => {
  const LOCALSTORAGE_KEY = `${LOCALSTORAGE_LAST_VIEWED_KEY}-${title}`;
  const [viewedAt, setViewedAt] = useLocalStorageState<number | undefined>(
    LOCALSTORAGE_KEY,
    undefined,
  );
  const { data, ...rest } = useQuery({
    cacheTime: 0,
    queryFn: () => getPostViews({ title, viewedAt }),
    queryKey: getUseGetPostViewsQueryKey(title),
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    const { isIncreased } = data;

    if (isIncreased) {
      setViewedAt(Date.now());
    }
  }, [data, setViewedAt]);

  return { data, ...rest };
};
