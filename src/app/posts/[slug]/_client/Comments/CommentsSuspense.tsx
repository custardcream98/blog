import { QuerySuspense } from "src/components"

import { CommentsFallback } from "./CommentsFallback"
import { CommentsLoadingSpinner } from "./CommentsLoadingSpinner"

export function CommentsSuspense({ children }: React.PropsWithChildren) {
  return (
    <QuerySuspense
      FallbackComponent={CommentsFallback}
      loadingFallback={<CommentsLoadingSpinner />}
    >
      {children}
    </QuerySuspense>
  )
}
