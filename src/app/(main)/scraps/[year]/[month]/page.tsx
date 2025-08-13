import { notFound } from "next/navigation"

import { SubmoduleAutoRefresher } from "@/components/__dev__/SubmoduleAutoRefresher.client"
import { Link } from "@/components/Link"
import { ScrapGrid } from "@/domains/scrap/components/ScrapGrid"
import { ScrapItem } from "@/domains/scrap/components/ScrapItem/ScrapItem"
import {
  normalizeScrapDataByDate,
  normalizeScrapDataByMonth,
  sortScrapData,
} from "@/domains/scrap/utils/normalize"
import { getScrapsList } from "@/lib/octokit/scraps"
import { objectKeys } from "@/utils/types"

export { generateMetadata } from "./metadata"

export const dynamicParams = true
export const dynamic = "force-static"

export const generateStaticParams = async () => {
  const scraps = await getScrapsList()
  const scrapByMonth = normalizeScrapDataByMonth(scraps)

  return objectKeys(scrapByMonth).map((ym) => {
    const [year, month] = ym.split("-")
    return { year, month }
  })
}

export default async function ScrapsMonthPage({
  params,
}: {
  params: Promise<{ year: string; month: string }>
}) {
  const { year, month } = await params
  const yearNum = parseInt(year)
  const monthNum = parseInt(month)

  if (isNaN(yearNum) || isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
    notFound()
  }

  const { byDate, dateKeys } = await getScraps({ year: yearNum, month: monthNum })

  return (
    <section className='mt-5 space-y-8'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-bold'>
          {year}년 {month}월 스크랩
        </h2>
        <Link className='text-foreground/70 hover:text-foreground text-sm' href='/scraps'>
          모든 스크랩 보기
        </Link>
      </div>

      <div className='space-y-8'>
        {dateKeys.map((date) => {
          const scrapsForDate = byDate[date]
          return (
            <section className='space-y-4' key={date}>
              <h3 className='bg-background/90 border-foreground/10 sticky top-0 z-10 border-b py-3 text-base font-medium backdrop-blur-sm'>
                {date}
              </h3>
              <ScrapGrid>
                {scrapsForDate.map((scrap) => (
                  <ScrapGrid.Item key={scrap.url}>
                    <ScrapItem {...scrap} />
                  </ScrapGrid.Item>
                ))}
              </ScrapGrid>
            </section>
          )
        })}
      </div>

      {process.env.NODE_ENV === "development" && <SubmoduleAutoRefresher />}
    </section>
  )
}

const getScraps = async ({ year, month }: { year: number; month: number }) => {
  const targetPrefix = `${year}-${month.toString().padStart(2, "0")}`
  const scraps = await getScrapsList()
  const sortedScraps = sortScrapData(scraps)
  const monthScraps = sortedScraps
    .filter((s) => {
      try {
        return new Date(s.scrapedAt).toISOString().startsWith(targetPrefix)
      } catch {
        return false
      }
    })
    .sort((a, b) => new Date(b.scrapedAt).getTime() - new Date(a.scrapedAt).getTime())

  if (!monthScraps.length) {
    notFound()
  }

  const byDate = normalizeScrapDataByDate(monthScraps)
  const dateKeys = objectKeys(byDate)

  return {
    byDate,
    dateKeys,
  }
}
