"use client"

import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

export const SubmoduleAutoRefresher = () => {
  if (process.env.NODE_ENV !== "development")
    throw new Error("SubmoduleAutoRefresher is only for development")

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3201")

    ws.onmessage = (e) => {
      if (e.data === "refresh") {
        const revalidateByPath = async () => {
          const paths = pathname.slice(1).split("/")

          if (paths[0] === "posts" && paths[1]) {
            await fetch(`/api/revalidate-post?slug=${paths[1]}`, {
              method: "POST",
            })
          } else if (paths[0] === "scraps" && paths[1] && paths[2]) {
            await Promise.all([
              fetch(`/api/revalidate-scrap?year=${paths[1]}&month=${paths[2]}`, {
                method: "POST",
              }),
              fetch(`/api/revalidate-scrap`, {
                method: "POST",
              }),
            ])
          } else if (paths[0] === "scraps") {
            await fetch(`/api/revalidate-scrap`, {
              method: "POST",
            })
          }
        }

        revalidateByPath().then(() => router.refresh())
      }
    }

    return () => ws.close()
  }, [pathname, router])

  return null
}
