import { getCommentDocRef, getDoc, getDocData } from "src/lib/firebase/_utils"
import { encodeToPercentString, getRequestBody } from "src/utils"

import { StatusCodes } from "http-status-codes"
import { NextResponse } from "next/server"

/**
 * 비밀번호 확인용 요청
 */
export async function POST(request: Request): Promise<NextResponse> {
  const { password, commentId, postTitle } = await getRequestBody<{
    commentId: string
    password: string
    postTitle: string
  }>(request)

  if (!password || !commentId || !postTitle) {
    return NextResponse.json(
      { message: "잘못된 요청입니다. (데이터가 없습니다.)" },
      { status: StatusCodes.BAD_REQUEST },
    )
  }

  const encodedTitle = encodeToPercentString(postTitle)
  const commentDocRef = getCommentDocRef(encodedTitle, commentId)
  const commentDoc = await getDoc(commentDocRef)
  const commentDocData = getDocData(commentDoc)

  const isPasswordValid = commentDocData.password === password

  return NextResponse.json({ data: { isValid: isPasswordValid } })
}
