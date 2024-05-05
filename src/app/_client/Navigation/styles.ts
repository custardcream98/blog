import { ud } from "utility-class-components"

export const cssOutlineOnFocus = ud`
  focus:outline
  focus:(
    outline-2
    outline-accent-light
    dark:outline-accent-dark
    outline-offset-2
    rounded-[0.25rem]
  )
`
