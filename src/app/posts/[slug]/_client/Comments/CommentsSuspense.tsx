import { QuerySuspense } from "src/components";

import { CommentsFallback } from "./CommentsFallback";
import { CommentsLodingSpinner } from "./CommentsLodingSpinner";

import { type PropsWithChildren } from "react";

export function CommentsSuspense({ children }: PropsWithChildren) {
  return (
    <QuerySuspense FallbackComponent={CommentsFallback} loadingFallback={<CommentsLodingSpinner />}>
      {children}
    </QuerySuspense>
  );
}
