import fs from "fs/promises"
import { RequestError } from "octokit"

import { DEFAULT_CONFIG } from "@/lib/octokit/_constants"
import { octokit } from "@/lib/octokit/_instance"

export async function getFileContent<T>({
  fetchPath,
  localPath,
  fallback,
  parseJson,
}: {
  fetchPath: string
  localPath: string
  fallback: (error: RequestError) => T
  parseJson?: true
}): Promise<T>
export async function getFileContent<T>({
  fetchPath,
  localPath,
  fallback,
  parseJson,
}: {
  fetchPath: string
  localPath: string
  fallback: (error: RequestError) => T
  parseJson: false
}): Promise<string>
export async function getFileContent<T>({
  fetchPath,
  localPath,
  fallback,
  parseJson = true,
}: {
  /** 실제 데이터 경로 */
  fetchPath: string
  /** 개발 환경에서 사용할 경로 */
  localPath: string
  /** 404 에러 발생시 사용, 리턴됨 */
  fallback: (error: RequestError) => T
  /** 데이터를 JSON 파싱할지 여부 */
  parseJson?: boolean
}): Promise<string | T> {
  try {
    if (process.env.NODE_ENV === "development" && !process.env.USE_OCTOKIT_INSTEAD_OF_SUBMODULE) {
      const data = await fs.readFile(localPath, "utf-8")

      return parseJson ? (JSON.parse(data) as T) : (data as string)
    }

    const { data } = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
      ...DEFAULT_CONFIG,
      path: fetchPath,
      mediaType: {
        format: "raw",
      },
    })

    return parseJson ? (JSON.parse(data as unknown as string) as T) : (data as unknown as string)
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

type DirectoryFileData = {
  path: string
  name: string
}

export const getDirectoryFilesList = async ({
  fetchPath,
  localPath,
  fallback,
}: {
  fetchPath: string
  localPath: string
  fallback: (error: RequestError) => DirectoryFileData[]
}) => {
  try {
    if (process.env.NODE_ENV === "development" && !process.env.USE_OCTOKIT_INSTEAD_OF_SUBMODULE) {
      const data = await fs.readdir(localPath, "utf-8")
      const pathPrefix = localPath.replace(process.cwd(), "")

      return data.map((name) => ({
        path: `${pathPrefix}/${name}`,
        name,
      }))
    }

    const { data } = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
      ...DEFAULT_CONFIG,
      path: fetchPath,
      mediaType: {
        format: "raw",
      },
    })

    return data as unknown as DirectoryFileData[]
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
