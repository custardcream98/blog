import { SubmoduleAutoRefresher } from "@/components/__dev__/SubmoduleAutoRefresher.client"
import { Link } from "@/components/Link"
import { PageHeader } from "@/components/PageHeader"
import { ScrapGrid } from "@/domains/scrap/components/ScrapGrid"
import { ScrapItem } from "@/domains/scrap/components/ScrapItem/ScrapItem"
import { normalizeScrapDataByDate } from "@/domains/scrap/utils/normalize"
import { getScrapsList } from "@/lib/octokit/scraps"
import { objectKeys } from "@/utils/types"

export { metadata } from "./metadata"

export default async function ScrapsPage() {
  const { scrapByDate, recentDateKeys } = await getScraps()

  return (
    <>
      <section className='mt-5'>
        <PageHeader title='최근 스크랩'>
          <Link className='text-foreground/70 hover:text-foreground text-sm' href='/scraps/rss'>
            스크랩 RSS
          </Link>
        </PageHeader>

        <div className='space-y-8'>
          {recentDateKeys.map((date) => {
            const scrapsForDate = scrapByDate[date]

            return (
              <section className='space-y-4' key={date}>
                <h3 className='bg-background/90 border-foreground/10 sticky top-0 z-10 border-b py-3 text-base font-medium backdrop-blur-sm'>
                  <time dateTime={date}>{date}</time> <span className='sr-only'>스크랩 목록</span>
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
      </section>

      {process.env.NODE_ENV === "development" && !process.env.USE_OCTOKIT_INSTEAD_OF_SUBMODULE && (
        <SubmoduleAutoRefresher />
      )}
    </>
  )
}

const getScraps = async () => {
  const scraps = await getScrapsList()

  const MAX_DAYS = 30
  const scrapByDate = normalizeScrapDataByDate(scraps)
  const dateKeys = objectKeys(scrapByDate)
  const recentDateKeys = dateKeys.slice(0, MAX_DAYS)

  return {
    scrapByDate,
    recentDateKeys,
  }
}
