import chokidar from "chokidar"
import path from "path"
import { WebSocketServer, WebSocket } from "ws"

const CONTENT_DIR = path.join(process.cwd(), "blog-posts")

const wss = new WebSocketServer({ port: 3201 })
const clients = new Set<WebSocket>()

wss.on("connection", (ws) => {
  clients.add(ws)
  ws.on("close", () => clients.delete(ws))
})

chokidar
  .watch(
    [
      path.join(CONTENT_DIR, "posts"),
      path.join(CONTENT_DIR, "img"),
      path.join(CONTENT_DIR, "post-list.json"),
      path.join(CONTENT_DIR, "scraps.json"),
    ],
    {
      ignoreInitial: true,
      ignored: (p, st) => {
        if (!st) return false
        if (st.isDirectory()) return false
        if (p.endsWith(".mdx")) return false
        if (p.endsWith(".json")) return false

        return !/\.(png|jpe?g|gif|webp|svg)$/i.test(p)
      },
      awaitWriteFinish: true,
      followSymlinks: true,
    },
  )
  .on("all", (event, changedPath) => {
    const isPost = changedPath.startsWith(path.join(CONTENT_DIR, "posts"))
    const isScrap = path.join(CONTENT_DIR, "scraps.json")

    clearTimeout(
      (global as unknown as { __refreshTimer: ReturnType<typeof setTimeout> }).__refreshTimer,
    )
    ;(global as unknown as { __refreshTimer: ReturnType<typeof setTimeout> }).__refreshTimer =
      setTimeout(() => {
        console.log("🔌 refresh", path)
        clients.forEach((ws) =>
          ws.send(
            JSON.stringify({
              type: isPost ? "post" : isScrap ? "scrap" : "refresh",
              slug: isPost
                ? changedPath
                    .split("/")
                    .at(-1)
                    ?.replace(/\.mdx$/, "")
                : undefined,
            }),
          ),
        )
      }, 100)
  })

console.log("🔌 MDX watcher + WebSocket server running on ws://localhost:3201")
