import { cn } from "@/utils/cn"

export const PageHeader = ({
  className,
  title,
  children,
}: React.PropsWithChildren<{ title: React.ReactNode; className?: string }>) => (
  <header className={cn("mb-6 flex items-center justify-between gap-2", className)}>
    <h2 className='shrink-0 text-xl font-bold'>{title}</h2>
    {children}
  </header>
)
