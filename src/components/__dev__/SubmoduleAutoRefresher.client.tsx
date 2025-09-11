"use client"

import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

export const SubmoduleAutoRefresher = () => {
  if (process.env.NODE_ENV !== "development")
    throw new Error("SubmoduleAutoRefresher is only for development")

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3201/_dev_submodule_watcher")

    ws.onmessage = async (e) => {
      const data = JSON.parse(e.data) as
        | { type: "post"; slug: string }
        | { type: "refresh" | "scrap" }

      if (data.type === "post") {
        await fetch(`/api/guarded/revalidate-post?slug=${data.slug}`, {
          method: "POST",
        })
      } else if (data.type === "scrap") {
        await fetch(`/api/guarded/revalidate-scrap`, {
          method: "POST",
        })
      }

      router.refresh()
    }

    return () => ws.close()
  }, [pathname, router])

  return null
}
