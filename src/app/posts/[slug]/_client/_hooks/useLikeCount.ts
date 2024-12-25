import { usePatchPostLikesMutation } from "src/request"
import { postQueryOptions } from "src/request/query-keys"

import { useQuery } from "@tanstack/react-query"
import { useCallback, useLayoutEffect, useState } from "react"

const LOCALSTORAGE_IS_LIKED_KEY = "isLiked"
const getIsLikedLocalStorageKey = (title: string) => `${LOCALSTORAGE_IS_LIKED_KEY}-${title}`

export const useLikeCount = (postTitle: string) => {
  const localStorageKey = getIsLikedLocalStorageKey(postTitle)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const { data: likesData } = useQuery(postQueryOptions.getPostLikes({ title: postTitle }))
  const likeCount = likesData ? likesData.likes : undefined

  const { mutate: mutatePatchPostLikes, isPending: isPatchingLike } = usePatchPostLikesMutation()

  useLayoutEffect(() => {
    const isLikedLocalStorageValue = localStorage.getItem(localStorageKey)

    const isLikedLocalStorageValueParsed =
      isLikedLocalStorageValue !== null ? (JSON.parse(isLikedLocalStorageValue) as boolean) : false

    setIsLiked(isLikedLocalStorageValueParsed)
  }, [localStorageKey])

  const handleLikeClick = useCallback(() => {
    setIsLiked((isLikedPreviously) => {
      const nextIsLiked = !isLikedPreviously

      mutatePatchPostLikes({ shouldLike: nextIsLiked, title: postTitle })

      localStorage.setItem(localStorageKey, JSON.stringify(nextIsLiked))

      return nextIsLiked
    })
  }, [postTitle, localStorageKey, mutatePatchPostLikes, setIsLiked])

  return { handleLikeClick, isLiked, isPatchingLike, likeCount }
}
