import { Time } from "@/components/Time"

export const PostItem = ({
  title,
  date,
  description,
}: {
  title: string
  date: string
  description: string
}) => (
  <span className='flex w-full flex-col gap-2'>
    <span className='flex flex-col justify-between gap-1 lg:flex-row lg:items-center lg:gap-2'>
      <span className='text-lg break-keep'>{title}</span>
      <Time date={date} />
    </span>
    <span className='text-foreground/50 text-sm'>{description}</span>
  </span>
)
