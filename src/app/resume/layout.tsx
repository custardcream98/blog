import { cn } from "@/utils/cn"

export default function ResumeLayout({ children }: React.PropsWithChildren) {
  return (
    <body
      className={cn(
        "bg-foreground text-background flex min-h-screen flex-col font-sans",
        "px-4 lg:mx-auto lg:w-200 lg:px-0",
      )}
    >
      {children}
    </body>
  )
}
