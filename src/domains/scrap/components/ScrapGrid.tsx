export const ScrapGrid = ({ children }: React.PropsWithChildren) => {
  return <ul className='columns-1 gap-x-3 sm:columns-2'>{children}</ul>
}

const ScrapGridItem = ({ children }: React.PropsWithChildren) => {
  return <li className='break-inside-avoid [&+&]:mt-3'>{children}</li>
}

ScrapGrid.Item = ScrapGridItem
