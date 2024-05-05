import { IconButton } from "src/components/client"
import { CommentEditState } from "src/types/comment"

import { useCommentEditorStateSetter } from "../context"

import { AiFillEdit } from "react-icons/ai"
import { IoMdClose } from "react-icons/io"
import { MdDelete } from "react-icons/md"
import { utld } from "utility-class-components"

function OptionOpenedState() {
  const { getStateSetter } = useCommentEditorStateSetter()

  return (
    <Wrapper>
      <IconButton
        icon={AiFillEdit}
        title='댓글 수정하기 버튼입니다.'
        onClick={getStateSetter(CommentEditState.CHECK_PASSWORD_EDIT)}
      />
      <IconButton
        icon={MdDelete}
        title='댓글 삭제하기 버튼입니다.'
        onClick={getStateSetter(CommentEditState.CHECK_PASSWORD_DELETE)}
      />
      <IconButton
        icon={IoMdClose}
        title='댓글 더보기 닫기 버튼입니다.'
        onClick={getStateSetter(CommentEditState.DEFAULT)}
      />
    </Wrapper>
  )
}

const Wrapper = utld.div`
  flex
  items-center

  animate-show

  [&>button]:ml-[0.2rem]
`

export default OptionOpenedState
