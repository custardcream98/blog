import { Link } from "@/components/Link"
import { normalizeScrapDataByMonth, sortScrapData } from "@/domains/scrap/utils/normalize"
import { getScrapsList } from "@/lib/octokit/scraps"
import { objectKeys } from "@/utils/types"

export default async function ScrapsLayout({ children }: { children: React.ReactNode }) {
  const { monthKeys } = await getScrapMonthKeys()

  return (
    <div className='flex w-full flex-1 flex-col gap-6'>
      <div className='flex-1'>{children}</div>
      <nav className='border-foreground/10 mt-6 border-t pt-6'>
        <h2 className='mb-4 text-lg font-medium'>월별 보기</h2>
        <div className='flex flex-wrap gap-2'>
          {Array.from(new Set(monthKeys)).map((ym) => {
            const [y, m] = ym.split("-")
            return (
              <Link
                className='text-foreground/70 hover:text-foreground text-sm'
                href={`/scraps/${y}/${m}`}
                key={ym}
              >
                {ym}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

const getScrapMonthKeys = async () => {
  const scraps = await getScrapsList()
  const sortedScraps = sortScrapData(scraps)

  const scrapByMonth = normalizeScrapDataByMonth(sortedScraps)
  const monthKeys = objectKeys(scrapByMonth)

  return {
    monthKeys,
  }
}
