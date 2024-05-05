"use client"

import { IsDarkmodeActivatedContextProvider } from "./IsDarkmodeActivatedContext"
import { QueryClientProvider } from "./QueryClientProvider"

import { PropsWithChildren } from "react"

export function RootProvider({ children }: PropsWithChildren) {
  return (
    <IsDarkmodeActivatedContextProvider>
      <QueryClientProvider>{children}</QueryClientProvider>
    </IsDarkmodeActivatedContextProvider>
  )
}

export {
  useIsDarkmodeActivated,
  useSetIsDarkmodeActivatedContext,
} from "./IsDarkmodeActivatedContext"
