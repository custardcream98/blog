import type { SvgComponentProps } from "./_type"

export function ExternalLinkSvg({ svgTitle, ...restProps }: SvgComponentProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      fill='none'
      stroke='currentColor'
      {...restProps}
    >
      {svgTitle && <title>{svgTitle}</title>}
      <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'></path>
      <polyline points='15 3 21 3 21 9'></polyline>
      <line x1='10' y1='14' x2='21' y2='3'></line>
    </svg>
  )
}
