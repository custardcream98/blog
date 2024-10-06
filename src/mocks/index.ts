const setup = async () => {
  if (typeof window === "undefined") {
    const { server } = await import("./server")
    server.listen()
  } else {
    const { worker } = await import("./browser")
    worker.start()
  }
}

if (process.env.NODE_ENV === "development") {
  setup()
}
