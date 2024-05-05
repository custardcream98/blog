import { ComponentPropsWithoutRef } from "react"

export type SvgComponentProps = ComponentPropsWithoutRef<"svg"> & {
  svgTitle?: string
}
