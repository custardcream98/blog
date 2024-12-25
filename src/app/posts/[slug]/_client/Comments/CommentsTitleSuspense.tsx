import { QuerySuspense } from "src/components"

import { ud, utld } from "utility-class-components"

export const CommentsTitleSuspense = ({ children }: React.PropsWithChildren) => {
  return (
    <QuerySuspense
      FallbackComponent={() => <Title>댓글 로드 실패</Title>}
      loadingFallback={
        <Title>
          Comments(
          <Skeleton />)
        </Title>
      }
    >
      {children}
    </QuerySuspense>
  )
}

// TODO: Skeleton 컴포넌트 공통화
const skeletonStyle = ud`
  animate-pulse
  bg-gray-200
  dark:bg-gray-700
  rounded-md
`

const Skeleton = () => {
  return (
    <span
      className={ud`
        ${skeletonStyle}
        inline-block
        h-6
        w-6
      `}
    >
      <span className='sr-only'>로딩중</span>
    </span>
  )
}

const Title = utld.h3`
  flex
  items-center
  
  w-full
  font-medium
  text-[1.5rem]
  pb-2
  mb-4

  border-b-[3px]
  border-default-sub-light
  dark:border-default-sub-dark
  border-solid
`
