import { Rings } from "react-loader-spinner"

export function PageLoadingSpinner() {
  return (
    <Rings wrapperClass='[&>svg]:stroke-default-sub-light [&>svg]:dark:stroke-default-sub-dark' />
  )
}
