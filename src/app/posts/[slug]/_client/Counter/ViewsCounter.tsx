import { LoadingIndicator } from "./LoadingIndicator"

import { HiEye } from "react-icons/hi"
import { utld } from "utility-class-components"
import { useLocalStorageState } from "src/hook"
import { useQuery } from "@tanstack/react-query"
import { postQueryOptions } from "src/request/query-keys"
import { useEffect } from "react"

type ViewsCounterProps = {
  title: string
}

export function ViewsCounter({ title }: ViewsCounterProps) {
  const { data: viewsData } = usePostViews(title)
  const isViewCountLoaded = viewsData?.views !== undefined

  return (
    <CounterContainer>
      <StyledHiEye title='조회수' size={15} className='mr-1' />
      {isViewCountLoaded ? <CounterValue>{viewsData.views}</CounterValue> : <LoadingIndicator />}
    </CounterContainer>
  )
}

const StyledHiEye = utld(HiEye)`
  text-default-sub-light
  dark:text-default-sub-dark
`

const CounterContainer = utld.em`
  ml-2
  flex
  items-center

  min-w-[4rem]

  px-2
  rounded-full

  border-[1px]
  border-solid
  border-text-default-light
  dark:border-text-default-dark
`

const CounterValue = utld.span`
  mx-auto
  text-[1rem]
  font-light

  text-default-sub-light
  dark:text-default-sub-dark
`

const LOCALSTORAGE_LAST_VIEWED_KEY = "lastViewedData"
export const usePostViews = (title: string) => {
  const [viewedAtData, setViewedAtData] = useLocalStorageState<
    | {
        [title: string]: number
      }
    | undefined
  >(LOCALSTORAGE_LAST_VIEWED_KEY, undefined)

  const postViewsQuery = useQuery(
    postQueryOptions.getPostViews({ title, viewedAt: viewedAtData?.[title] }),
  )

  useEffect(() => {
    if (!postViewsQuery.isFetching && !postViewsQuery.isError && postViewsQuery.data?.isIncreased) {
      setViewedAtData((prev) => ({ ...prev, [title]: Date.now() }))
    }
  }, [postViewsQuery.isFetching, postViewsQuery.isError, postViewsQuery.data])

  return postViewsQuery
}
