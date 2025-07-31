import { Link } from "@/components/Link"

export const NotFound = () => {
  return (
    <div className='mt-10 flex h-full flex-col items-center justify-center gap-4'>
      <h1 className='text-4xl font-bold'>404</h1>
      <p className='text-lg'>존재하지 않는 페이지입니다.</p>
      <Link className='underline underline-offset-4' href='/'>
        홈으로 돌아가기
      </Link>
    </div>
  )
}
