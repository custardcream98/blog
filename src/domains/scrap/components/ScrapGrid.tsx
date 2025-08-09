export const ScrapGrid = ({ children }: React.PropsWithChildren) => {
  return <ul className='columns-1 gap-x-3 sm:columns-2'>{children}</ul>
}

const ScrapGridItem = ({ children }: React.PropsWithChildren) => {
  return <li className='mb-3 break-inside-avoid'>{children}</li>
}

ScrapGrid.Item = ScrapGridItem
