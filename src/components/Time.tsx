export const Time = ({ date }: { date: string }) => (
  <time className='text-foreground/50 shrink-0 text-sm' dateTime={new Date(date).toISOString()}>
    {new Date(date).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}
  </time>
)
