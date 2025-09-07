import fs from "fs/promises"
import { RequestError } from "octokit"

import { DEFAULT_CONFIG } from "@/lib/octokit/_constants"
import { octokit } from "@/lib/octokit/_instance"

export const getFileContent = async <T>({
  fetchPath,
  localPath,
  fallback,
}: {
  /** 실제 데이터 경로 */
  fetchPath: string
  /** 개발 환경에서 사용할 경로 */
  localPath: string
  /** 404 에러 발생시 사용, 리턴됨 */
  fallback: (error: RequestError) => T
}) => {
  try {
    if (process.env.NODE_ENV === "development" && !process.env.USE_OCTOKIT_INSTEAD_OF_SUBMODULE) {
      const data = await fs.readFile(localPath, "utf-8")

      return JSON.parse(data) as T
    }

    const { data } = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
      ...DEFAULT_CONFIG,
      path: fetchPath,
      mediaType: {
        format: "raw",
      },
    })

    return JSON.parse(data as unknown as string) as T
  } catch (error) {
    if (
      (error instanceof RequestError && error.status === 404) ||
      process.env.NODE_ENV === "development"
    ) {
      return fallback(error as RequestError)
    }

    throw error
  }
}
