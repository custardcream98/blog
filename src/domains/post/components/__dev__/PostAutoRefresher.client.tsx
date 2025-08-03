"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const PostAutoRefresher = () => {
  if (process.env.NODE_ENV !== "development")
    throw new Error("PostAutoRefresher is only for development")

  const router = useRouter()

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3201")
    ws.onmessage = (e) => {
      if (e.data === "refresh") {
        router.refresh()
      }
    }
    return () => ws.close()
  }, [router])

  return null
}
