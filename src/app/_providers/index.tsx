"use client"

import { IsDarkmodeActivatedContextProvider } from "./IsDarkmodeActivatedContext"
import { QueryClientProvider } from "./QueryClientProvider"

import { PropsWithChildren } from "react"

export function RootProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider>
      <IsDarkmodeActivatedContextProvider>{children}</IsDarkmodeActivatedContextProvider>
    </QueryClientProvider>
  )
}

export {
  useIsDarkmodeActivated,
  useSetIsDarkmodeActivatedContext,
} from "./IsDarkmodeActivatedContext"
