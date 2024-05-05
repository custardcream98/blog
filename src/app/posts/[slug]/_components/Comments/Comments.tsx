import {
  CommentsList,
  CommentsSection,
  CommentsSectionForm,
  CommentsSectionTitle,
  CommentsSuspense,
} from "../../_client"

type CommentsProps = {
  postTitle: string
}

export function Comments({ postTitle }: CommentsProps) {
  return (
    <CommentsSection postTitle={postTitle}>
      <CommentsSectionTitle />
      <CommentsSectionForm />
      <CommentsSuspense>
        <CommentsList />
      </CommentsSuspense>
    </CommentsSection>
  )
}
