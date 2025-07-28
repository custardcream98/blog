import { cn } from "@/utils/cn"

export const Time = ({ className, date }: { className?: string; date: string }) => (
  <time
    className={cn("text-foreground/50 shrink-0 text-sm", className)}
    dateTime={new Date(date).toISOString()}
  >
    {new Date(date).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}
  </time>
)
