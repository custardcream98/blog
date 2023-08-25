import { useLocalStorageState } from "src/hook";
import { useGetPostViewsQuery } from "src/request";

import { useEffect, useState } from "react";

const LOCALSTORAGE_LAST_VIEWED_KEY = "lastViewed";

export const useViewsCount = (title: string) => {
  const LOCALSTORAGE_KEY = `${LOCALSTORAGE_LAST_VIEWED_KEY}-${title}`;
  const [viewedAt, setViewedAt] = useLocalStorageState<number | undefined>(
    LOCALSTORAGE_KEY,
    undefined,
  );

  const [isRefetching, setIsRefetching] = useState(false);

  const { data: viewsData, isLoading } = useGetPostViewsQuery(
    title,
    !isRefetching ? viewedAt : Date.now(),
  );

  useEffect(() => {
    const isServerSide = typeof window === "undefined";

    if (!viewsData || isServerSide) return;

    if (viewsData.isIncreased) {
      setViewedAt(Date.now());
      return;
    } else if (isRefetching) {
      setIsRefetching(false);
    }
  }, [viewsData, setViewedAt, isRefetching]);

  return {
    isLoading,
    views: viewsData?.views ?? 0,
  };
};
