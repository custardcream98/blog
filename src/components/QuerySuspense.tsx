import { QueryErrorResetBoundary } from "@tanstack/react-query"
import { Suspense } from "react"
import { ErrorBoundary, type ErrorBoundaryProps } from "react-error-boundary"

const errorLogger = (error: Error, info: { componentStack: string }) => {
  if (process.env.NODE_ENV === "development") {
    console.error(error, info)
  }
}

export type QuerySuspenseProps = React.PropsWithChildren<
  ErrorBoundaryProps & {
    loadingFallback?: React.ReactNode
  }
>

export function QuerySuspense({ children, loadingFallback, ...props }: QuerySuspenseProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary {...props} onReset={reset} onError={errorLogger}>
          <Suspense fallback={loadingFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
