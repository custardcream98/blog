import { Footer } from "@/domains/main/components/Footer"
import { GlobalNavigation } from "@/domains/main/components/GlobalNavigation"

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <div className='px-2 lg:mx-auto lg:w-200 lg:px-0'>
      <GlobalNavigation />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
