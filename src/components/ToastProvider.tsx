"use client"

import { Toaster } from "react-hot-toast"

export function ToastProvider() {
  return (
    <Toaster
      position='bottom-right'
      toastOptions={{
        className: "bg-background text-foreground border border-foreground/20 shadow-xl",
        style: {
          fontSize: "0.875rem",
        },
        success: {
          iconTheme: {
            primary: "#4ade80",
            secondary: "var(--color-background)",
          },
        },
        error: {
          iconTheme: {
            primary: "#f87171",
            secondary: "var(--color-background)",
          },
        },
      }}
    />
  )
}
