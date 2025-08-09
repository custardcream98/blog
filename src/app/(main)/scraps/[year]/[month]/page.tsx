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
  const { byDate, dateKeys } = await getScraps({ year, month })

  return (
    <>
      <div className='flex items-center justify-between'>
        <h2 className='font-bold'>
          {year}년 {month}월 스크랩
        </h2>
        <Link className='text-foreground/70 text-sm font-normal' href='/scraps'>
          모든 스크랩 보기
        </Link>
      </div>

      {dateKeys.map((date) => {
        const scrapsForDate = byDate[date]
        return (
          <section className='mb-8' key={date}>
            <h3 className='bg-background/80 sticky top-0 z-10 py-2 text-sm font-semibold backdrop-blur'>
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

      {process.env.NODE_ENV === "development" && <SubmoduleAutoRefresher />}
    </>
  )
}

const getScraps = async ({ year, month }: { year: string; month: string }) => {
  const targetPrefix = `${year}-${month}`
  const scraps = await getScrapsList()
  const sortedScraps = sortScrapData(scraps)
  const monthScraps = sortedScraps
    .filter((s) => new Date(s.scrapedAt).toISOString().startsWith(targetPrefix))
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
