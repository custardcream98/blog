import { postQueryOptions } from "src/request/query-keys"

import CommentCard from "./CommentCard"
import { useCommentPostTitleContext } from "./CommentsSection.new"

import { useSuspenseQuery } from "@tanstack/react-query"
import { utld } from "utility-class-components"

export { CommentFormWithOpenButton as CommentsSectionForm } from "./CommentForm"

export function CommentsSectionTitle() {
  const title = useCommentPostTitleContext()
  const {
    data: { comments },
  } = useSuspenseQuery(postQueryOptions.getPostComments({ title }))

  return <Title>Comments({comments.length})</Title>
}

const Title = utld.h3`
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

export function CommentsList() {
  const title = useCommentPostTitleContext()
  const {
    data: { comments },
  } = useSuspenseQuery(postQueryOptions.getPostComments({ title }))

  return (
    <ol>
      {comments.map((commentData) => (
        <CommentCard key={commentData.id} commentId={commentData.id} {...commentData} />
      ))}
    </ol>
  )
}
