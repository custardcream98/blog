import {
  CommentsList,
  CommentsSection,
  CommentsSectionForm,
  CommentsSectionTitle,
  CommentsSuspense,
  CommentsTitleSuspense,
} from "../../_client"

type CommentsProps = {
  postTitle: string
}

export function Comments({ postTitle }: CommentsProps) {
  return (
    <CommentsSection postTitle={postTitle}>
      <CommentsTitleSuspense>
        <CommentsSectionTitle />
      </CommentsTitleSuspense>
      <CommentsSectionForm />
      <CommentsSuspense>
        <CommentsList />
      </CommentsSuspense>
    </CommentsSection>
  )
}
