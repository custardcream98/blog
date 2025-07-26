import type { SvgComponentProps } from "./_types"

export function ExternalLinkSvg({ svgTitle, ...restProps }: SvgComponentProps) {
  return (
    <svg
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      {...restProps}
    >
      {svgTitle && <title>{svgTitle}</title>}
      <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'></path>
      <polyline points='15 3 21 3 21 9'></polyline>
      <line x1='10' x2='21' y1='14' y2='3'></line>
    </svg>
  )
}
