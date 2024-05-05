import { CommentEditState } from "src/types/comment"

import CheckPasswordState from "./CheckPasswordState"
import DefaultState from "./DefaultState"
import EditState from "./EditState"
import OptionOpenedState from "./OptionOpenedState"

const commentEditorStateChildrenMap: {
  [key in CommentEditState]: React.ReactNode
} = {
  [CommentEditState.DEFAULT]: <DefaultState />,
  [CommentEditState.OPTION_OPENED]: <OptionOpenedState />,
  [CommentEditState.CHECK_PASSWORD_EDIT]: <CheckPasswordState stateTo={CommentEditState.EDIT} />,
  [CommentEditState.CHECK_PASSWORD_DELETE]: (
    <CheckPasswordState stateTo={CommentEditState.DELETE} />
  ),
  [CommentEditState.EDIT]: <EditState />,
  [CommentEditState.DELETE]: null,
}

export default commentEditorStateChildrenMap
