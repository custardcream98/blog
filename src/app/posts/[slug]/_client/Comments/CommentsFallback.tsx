import { type FallbackProps } from "react-error-boundary"
import { utld } from "utility-class-components"

export function CommentsFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className='mt-14 text-center'>
      <p className='mb-5'>댓글 로드중 오류가 발생했습니다.</p>
      <Button type='button' onClick={resetErrorBoundary}>
        다시 시도하기
      </Button>
    </div>
  )
}

const Button = utld.button`
  px-2

  rounded-[5px]

  transition-all
  transition-ease
  duration-200

  bg-default-light
  dark:bg-default-dark
  text-bg-light
  dark:text-bg-dark

  hover:(
    text-accent-light
    dark:text-accent-dark
    scale-[1.05]
  )

  focus:(
    text-accent-light
    dark:text-accent-dark
    scale-[1.05]
  )
`
