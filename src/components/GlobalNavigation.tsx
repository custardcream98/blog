import { LogoSvg } from "@/assets/svg/LogoSvg"
import { Link } from "@/components/Link"

export const GlobalNavigation = () => {
  return (
    <nav className='flex w-full py-2'>
      <h1 className='flex items-center gap-2'>
        <Link className='flex items-center gap-1 lg:gap-1.5' href='/'>
          <LogoSvg className='size-4 lg:size-5' svgTitle='shiwoo.dev logo' />
          <span className='font-mono text-sm lg:text-base'>shiwoo.dev</span>
        </Link>
      </h1>

      <div className='text-foreground/50 ml-auto flex items-center gap-2 text-sm'>
        <Link href='/scraps'>scraps</Link>
        <Link href='/about'>about me</Link>
      </div>
    </nav>
  )
}
