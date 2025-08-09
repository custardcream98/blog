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

export default async function ScrapsPage() {
  const { scrapByDate, recentDateKeys, monthKeys } = await getScraps()

  return (
    <>
      <section>
        <h2 className='font-bold'>최근 스크랩</h2>

        {recentDateKeys.map((date) => {
          const scrapsForDate = scrapByDate[date]

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
      </section>

      <nav className='text-foreground/70 mt-10 border-t pt-4 text-sm'>
        <h2 className='mb-3 font-semibold'>월별 보기</h2>
        <ul className='flex flex-wrap gap-2'>
          {Array.from(new Set(monthKeys)).map((ym) => {
            const [y, m] = ym.split("-")
            return (
              <li key={ym}>
                <Link href={`/scraps/${y}/${m}`}>{ym}</Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {process.env.NODE_ENV === "development" && <SubmoduleAutoRefresher />}
    </>
  )
}

const getScraps = async () => {
  const scraps = await getScrapsList()
  const sortedScraps = sortScrapData(scraps)

  const MAX_DAYS = 30
  const scrapByDate = normalizeScrapDataByDate(sortedScraps)
  const dateKeys = objectKeys(scrapByDate)
  const recentDateKeys = dateKeys.slice(0, MAX_DAYS)

  const scrapByMonth = normalizeScrapDataByMonth(sortedScraps)
  const monthKeys = objectKeys(scrapByMonth)

  return {
    scrapByDate,
    recentDateKeys,
    monthKeys,
  }
}
