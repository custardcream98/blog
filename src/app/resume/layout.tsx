export default function ResumeLayout({ children }: React.PropsWithChildren) {
  return (
    <div className='min-h-screen bg-white text-gray-800'>
      <div className='px-2 py-10 lg:mx-auto lg:w-200 lg:px-0'>{children}</div>
    </div>
  )
}
