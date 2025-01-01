import {
  isServer,
  QueryClient,
  QueryClientProvider as RQQueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const makeQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        /**
         * 기본값 0으로 두면
         * 서버에서 미리 fetch한 쿼리를 클라이언트에서 다시 fetch하게 됨
         * 따라서 기본값 60초 부여
         */
        staleTime: 60_000,
      },
    },
  })

  return queryClient
}

let browserQueryClient: QueryClient | null = null

const getQueryClient = () => {
  if (isServer) {
    /** 매번 새로운 쿼리 클라이언트 인스턴스를 생성 */
    return makeQueryClient()
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient()
  }

  return browserQueryClient
}

export function QueryClientProvider({ children }: React.PropsWithChildren) {
  const queryClient = getQueryClient()

  return (
    <RQQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </RQQueryClientProvider>
  )
}
