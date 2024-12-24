import type { Categoires } from "src/constants/categoryTheme"

export type CategoryPageParams = {
  params: Promise<{
    category: Categoires
  }>
}
