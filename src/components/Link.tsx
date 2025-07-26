import { default as NextLink } from "next/link"

import { cn } from "@/utils/cn"

export const Link = ({ className, ...props }: React.ComponentProps<typeof NextLink>) => (
  <NextLink
    className={cn(
      className,
      "hover:bg-foreground/10 bg-background inline-flex rounded-md px-1 py-0.5 transition-all duration-200 active:scale-[98%]",
    )}
    {...props}
  />
)
