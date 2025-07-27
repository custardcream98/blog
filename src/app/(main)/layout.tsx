import { Footer } from "@/components/Footer"
import { GlobalNavigation } from "@/components/GlobalNavigation"

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <div className='px-2 lg:mx-auto lg:w-200 lg:px-0'>
      <GlobalNavigation />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
