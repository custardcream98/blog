import { revalidatePath, revalidateTag } from "next/cache"

export const revalidateFonts = () => {
  revalidateTag("fonts")
  revalidatePath("/api/font/d2coding/[format]", "page")
  revalidatePath("/api/font/pretendard")
}
