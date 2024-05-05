import type { SvgComponentProps } from "./_type"

export function LogoSvg({ svgTitle, ...restProps }: SvgComponentProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 601.72 601.72'
      fill='currentColor'
      {...restProps}
    >
      {svgTitle && <title>{svgTitle}</title>}
      <path d='M401,57A143.76,143.76,0,0,1,544.72,200.76V401A143.74,143.74,0,0,1,401,544.72H200.76A143.76,143.76,0,0,1,57,401V200.76A143.77,143.77,0,0,1,200.76,57H401m0-57H200.76C89.88,0,0,89.88,0,200.76V401C0,511.84,89.88,601.72,200.76,601.72H401c110.87,0,200.75-89.88,200.75-200.75V200.76C601.72,89.88,511.84,0,401,0Z' />
      <rect x='145.71' y='145.71' width='310.3' height='310.3' rx='78.49' />
    </svg>
  )
}
