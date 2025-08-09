import { ScrapData } from "@/lib/octokit/scraps"
import { Brand } from "@/utils/types"

/** YYYY-MM-DD */
export type ScrapDataDate = Brand<`${number}-${number}-${number}`, "ScrapDataDate">
/** YYYY-MM */
export type ScrapDataMonth = Brand<`${number}-${number}`, "ScrapDataMonth">

export const getScrapDataDate = (scrap: ScrapData) =>
  new Date(scrap.scrapedAt).toISOString().split("T")[0] as ScrapDataDate

export const getScrapDataMonth = (scrap: ScrapData) =>
  new Date(scrap.scrapedAt).toISOString().slice(0, 7) as ScrapDataMonth

export const normalizeScrapDataByDate = (scraps: ScrapData[]) =>
  scraps.reduce<Record<ScrapDataDate, ScrapData[]>>((acc, scrap) => {
    const date = getScrapDataDate(scrap)

    if (!acc[date]) acc[date] = []
    acc[date].push(scrap)

    return acc
  }, {})

export const normalizeScrapDataByMonth = (scraps: ScrapData[]) =>
  scraps.reduce<Record<ScrapDataMonth, ScrapData[]>>((acc, scrap) => {
    const date = getScrapDataMonth(scrap)

    if (!acc[date]) acc[date] = []
    acc[date].push(scrap)

    return acc
  }, {})

export const sortScrapData = (scraps: ScrapData[]) =>
  scraps.sort((a, b) => new Date(b.scrapedAt).getTime() - new Date(a.scrapedAt).getTime())
