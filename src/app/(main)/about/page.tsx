import { Link } from "@/components/Link"

export { metadata } from "./metadata"

export default function AboutPage() {
  return (
    <section className='space-y-8 pt-20'>
      <div className='space-y-4'>
        <p className='text-lg'>
          <strong>프론트엔드 개발자 박시우</strong>입니다.
        </p>

        <p>&quot;Done is better than perfect&quot; 를 모토로 삼고 있습니다.</p>
      </div>

      {/* 프로젝트들 */}
      <div className='space-y-4'>
        <div className='space-y-4'>
          <div>
            <h3 className='mb-2 font-medium'>
              <Link
                className='flex items-center gap-1'
                href='https://coinrate.kr'
                rel='noopener noreferrer'
                target='_blank'
              >
                coinrate.kr <span className='text-xs'>↗</span>
              </Link>
            </h3>
            <p className='text-foreground/70 text-sm'>
              한국 주요 거래소 실시간 암호화폐 프리미엄 조회 서비스입니다.
            </p>
          </div>

          <div>
            <h3 className='mb-2 font-medium'>
              <Link
                className='flex items-center gap-1'
                href='https://github.com/custardcream98/msw-devtools'
                rel='noopener noreferrer'
                target='_blank'
              >
                MSW Devtools <span className='text-xs'>↗</span>
              </Link>
            </h3>
            <p className='text-foreground/70 text-sm'>
              MSW Request Handler를 UI로 관리할 수 있는 개발자 도구입니다. Framework 독립적으로
              설계해 React, Vue 등에서 사용할 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* 연락처 */}
      <div className='space-y-4'>
        <div className='flex flex-wrap gap-2'>
          <Link href='mailto:custardcream@kakao.com'>이메일</Link>
          <Link href='https://github.com/custardcream98'>GitHub</Link>
        </div>
      </div>

      {/* 마무리 */}
      <div className='border-foreground/10 border-t pt-6'>
        <p className='text-foreground/50 text-center text-sm'>
          더 자세한 이력은{" "}
          <Link className='text-foreground/70' href='/resume'>
            이력서
          </Link>
          에서 확인할 수 있습니다.
        </p>
      </div>
    </section>
  )
}
