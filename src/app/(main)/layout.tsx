import { Footer } from "@/components/Footer"
import { GlobalNavigation } from "@/components/GlobalNavigation"

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <div className='flex min-h-screen flex-col px-4 lg:mx-auto lg:w-200 lg:px-0'>
      <GlobalNavigation />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  )
}
