import { QuerySuspense } from "src/components";

import { CommentsFallback } from "./CommentsFallback";
import { CommentsLodingSpinner } from "./CommentsLodingSpinner";

export function CommentsSuspense({ children }: React.PropsWithChildren) {
  return (
    <QuerySuspense FallbackComponent={CommentsFallback} loadingFallback={<CommentsLodingSpinner />}>
      {children}
    </QuerySuspense>
  );
}
