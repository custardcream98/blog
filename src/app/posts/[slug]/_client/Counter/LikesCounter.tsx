import { useLikeCount } from "../_hooks"

import { LoadingIndicator } from "./LoadingIndicator"

import { ComponentPropsWithoutRef } from "react"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { ud, utld } from "utility-class-components"

type LikesCounterProps = ComponentPropsWithoutRef<"button"> & {
  title: string
}

export function LikesCounter({ title }: LikesCounterProps) {
  const { likeCount, isLiked, isPatchingLike, handleLikeClick } = useLikeCount(title)
  const isLikeCountLoaded = likeCount !== undefined && !isPatchingLike

  return (
    <LikeButton type='button' onClick={handleLikeClick} $isLiked={isLiked}>
      {isLiked ? (
        <BsHeartFill title='좋아요 버튼' width={15} height={15} className='mr-1 mt-[1px]' />
      ) : (
        <BsHeart title='좋아요 버튼' width={15} height={15} className='mr-1 mt-[1px]' />
      )}
      {isLikeCountLoaded ? (
        <LikeValue $isLiked={isLiked}>{likeCount}</LikeValue>
      ) : (
        <LoadingIndicator />
      )}
    </LikeButton>
  )
}

const HEART_COLOR = ud`
  text-[#c33434]
  border-[#c33434]
`
const SUB_TEXT_COLOR = ud`
  text-default-sub-light
  dark:text-default-sub-dark

  border-text-default-light
  dark:border-text-default-dark
`
type LikeValueProps = {
  $isLiked: boolean
}
const LikeButton = utld.button<LikeValueProps>`
  ml-3
  px-2
  min-w-[4rem]

  flex
  items-center

  bg-transparents
  
  rounded-full
  
  border-[1px]
  border-solid

  ${({ $isLiked }) => ($isLiked ? HEART_COLOR : SUB_TEXT_COLOR)}
`

const LikeValue = utld.span<LikeValueProps>`
  mx-auto
  text-[1rem]
  font-light
`
