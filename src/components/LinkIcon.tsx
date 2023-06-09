import type { ComponentPropsWithoutRef } from "react";
import { utld } from "utility-class-components";

type Props = {
  title: string;
  id: string;
  size?: string;
} & ComponentPropsWithoutRef<"svg">;

export function LinkIcon({ title, id, size = "100%", ...props }: Props) {
  return (
    <StyledSvg
      className='link-icon'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      fill='none'
      aria-labelledby={id}
      style={{
        height: size,
        width: size,
      }}
      {...props}
    >
      <title id={id}>{title}</title>
      <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'></path>
      <polyline points='15 3 21 3 21 9'></polyline>
      <line x1='10' y1='14' x2='21' y2='3'></line>
    </StyledSvg>
  );
}

const StyledSvg = utld.svg`
  stroke-default-light
  dark:stroke-default-dark

  hover:(
    stroke-accent-light
    dark:stroke-accent-dark
  )
`;
