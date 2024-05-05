import { CommentPostTitleContext } from "./CommentsSection.context"

import { utld } from "utility-class-components"

type Props = React.PropsWithChildren<{
  postTitle: string
}>

export function CommentsSection({ children, postTitle }: Props) {
  return (
    <CommentPostTitleContext.Provider value={postTitle}>
      <Wrapper>{children}</Wrapper>
    </CommentPostTitleContext.Provider>
  )
}

const Wrapper = utld.section`
  flex
  flex-col
  w-full
`
